import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { type User, type InsertUser } from '@shared/schema';
import { storage } from './storage';

// Configuration
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const SALT_ROUNDS = 12; // Increased from 10 for better security

// Comprehensive JWT secret validation
function validateJWTSecret(secret: string | undefined): string {
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required');
  }
  
  // Minimum length requirement
  if (secret.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long');
  }
  
  // Check for common weak patterns
  const weakPatterns = [
    'password', 'secret', 'changeme', 'default', '123456', 
    'development', 'test', 'admin', 'root', 'supersecret'
  ];
  
  const lowerSecret = secret.toLowerCase();
  for (const pattern of weakPatterns) {
    if (lowerSecret.includes(pattern)) {
      throw new Error(`JWT_SECRET contains weak pattern: ${pattern}`);
    }
  }
  
  // Check for sufficient complexity (should contain uppercase, lowercase, numbers, and symbols)
  const hasUppercase = /[A-Z]/.test(secret);
  const hasLowercase = /[a-z]/.test(secret);
  const hasNumbers = /\d/.test(secret);
  const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(secret);
  
  const complexityCount = [hasUppercase, hasLowercase, hasNumbers, hasSymbols].filter(Boolean).length;
  
  if (complexityCount < 3) {
    throw new Error('JWT_SECRET must contain at least 3 of: uppercase letters, lowercase letters, numbers, symbols');
  }
  
  return secret;
}

const VALIDATED_JWT_SECRET = validateJWTSecret(JWT_SECRET);

export interface AuthPayload {
  userId: string;
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  email?: string;
}

export class AuthService {
  /**
   * Hash a password using bcrypt
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  /**
   * Verify a password against a hash
   */
  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Generate a JWT token
   */
  generateToken(payload: AuthPayload): string {
    return jwt.sign(payload, VALIDATED_JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
      algorithm: 'HS256',
      issuer: '4seasons-realestate',
      audience: 'api-users'
    });
  }

  /**
   * Verify and decode a JWT token
   */
  verifyToken(token: string): AuthPayload {
    try {
      const decoded = jwt.verify(token, VALIDATED_JWT_SECRET, {
        algorithms: ['HS256'],
        issuer: '4seasons-realestate',
        audience: 'api-users'
      }) as AuthPayload;
      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Token has expired');
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid token format');
      } else {
        throw new Error('Token verification failed');
      }
    }
  }

  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<{ user: Omit<User, 'password'>; token: string }> {
    // Validate input
    if (!data.username || !data.password) {
      throw new Error('Username and password are required');
    }

    // Check password strength
    if (data.password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    // Check if user already exists
    const existingUser = await storage.getUserByUsername(data.username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Hash password
    const hashedPassword = await this.hashPassword(data.password);

    // Create user
    const newUser = await storage.createUser({
      username: data.username,
      password: hashedPassword,
    });

    // Generate token
    const token = this.generateToken({
      userId: newUser.id,
      username: newUser.username,
    });

    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    return { user: userWithoutPassword, token };
  }

  /**
   * Login a user
   */
  async login(credentials: LoginCredentials): Promise<{ user: Omit<User, 'password'>; token: string }> {
    // Validate input
    if (!credentials.username || !credentials.password) {
      throw new Error('Username and password are required');
    }

    // Find user
    const user = await storage.getUserByUsername(credentials.username);
    if (!user) {
      throw new Error('Invalid username or password');
    }

    // Verify password
    const isPasswordValid = await this.verifyPassword(credentials.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }

    // Generate token
    const token = this.generateToken({
      userId: user.id,
      username: user.username,
    });

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  /**
   * Validate a token and return the user
   */
  async validateToken(token: string): Promise<Omit<User, 'password'> | null> {
    try {
      const payload = this.verifyToken(token);
      const user = await storage.getUser(payload.userId);
      
      if (!user) {
        return null;
      }

      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      return null;
    }
  }

  /**
   * Refresh a token
   */
  refreshToken(token: string): string {
    const payload = this.verifyToken(token);
    return this.generateToken(payload);
  }
}

// Export singleton instance
export const authService = new AuthService();