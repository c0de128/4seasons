import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";
import { dbSecurity, commonValidationRules, createSecureDbMiddleware } from "./database/security";
import { logger } from "./logger";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private security = createSecureDbMiddleware();

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    // Validate ID format
    const validation = this.security.validateInput(id, commonValidationRules.id);
    if (!validation.valid) {
      logger.warn('Invalid user ID format', { id, errors: validation.errors });
      return undefined;
    }

    // Sanitize input
    const sanitizedId = this.security.sanitizeInput(id);
    
    // Audit the query
    this.security.auditQuery('SELECT', 'users', undefined, { id: sanitizedId });
    
    return this.users.get(sanitizedId);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    // Validate username
    const validation = this.security.validateInput(username, commonValidationRules.username);
    if (!validation.valid) {
      logger.warn('Invalid username format', { username, errors: validation.errors });
      return undefined;
    }

    // Sanitize input
    const sanitizedUsername = this.security.sanitizeInput(username);
    
    // Audit the query
    this.security.auditQuery('SELECT', 'users', undefined, { username: sanitizedUsername });
    
    return Array.from(this.users.values()).find(
      (user) => user.username === sanitizedUsername,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Validate input data
    const usernameValidation = this.security.validateInput(insertUser.username, commonValidationRules.username);
    if (!usernameValidation.valid) {
      const error = new Error(`Invalid username: ${usernameValidation.errors.join(', ')}`);
      logger.error('User creation failed - invalid username', { 
        username: insertUser.username, 
        errors: usernameValidation.errors 
      });
      throw error;
    }

    // Additional password validation (basic - real implementation should use stronger rules)
    if (!insertUser.password || insertUser.password.length < 8) {
      const error = new Error('Password must be at least 8 characters long');
      logger.error('User creation failed - weak password', { username: insertUser.username });
      throw error;
    }

    // Sanitize input
    const sanitizedUser = this.security.sanitizeInput(insertUser) as InsertUser;
    
    // Check for existing user
    const existingUser = await this.getUserByUsername(sanitizedUser.username);
    if (existingUser) {
      const error = new Error('Username already exists');
      logger.error('User creation failed - duplicate username', { username: sanitizedUser.username });
      throw error;
    }

    const id = randomUUID();
    const user: User = { ...sanitizedUser, id };
    
    // Audit the operation
    this.security.auditQuery('INSERT', 'users', id, { username: sanitizedUser.username });
    
    this.users.set(id, user);
    
    logger.info('User created successfully', { id, username: sanitizedUser.username });
    return user;
  }
}

export const storage = new MemStorage();
