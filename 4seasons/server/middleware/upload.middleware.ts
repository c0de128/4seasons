import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs/promises';
import { Request } from 'express';
import { logger } from '../logger';

// Allowed file types and their MIME types
const ALLOWED_FILE_TYPES = {
  // Images
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
  'image/gif': ['.gif'],
  
  // Documents
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  
  // Spreadsheets
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  
  // Text files
  'text/plain': ['.txt'],
  'text/csv': ['.csv'],
};

// Maximum file sizes per type (in bytes)
const FILE_SIZE_LIMITS = {
  'image/jpeg': 10 * 1024 * 1024, // 10MB for images
  'image/png': 10 * 1024 * 1024,
  'image/webp': 10 * 1024 * 1024,
  'image/gif': 5 * 1024 * 1024,   // 5MB for GIFs
  'application/pdf': 25 * 1024 * 1024, // 25MB for PDFs
  'application/msword': 10 * 1024 * 1024,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 10 * 1024 * 1024,
  'application/vnd.ms-excel': 10 * 1024 * 1024,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 10 * 1024 * 1024,
  'text/plain': 1 * 1024 * 1024,  // 1MB for text files
  'text/csv': 5 * 1024 * 1024,
};

// Malicious file patterns to block
const MALICIOUS_PATTERNS = [
  // Executable extensions
  /\.(exe|bat|cmd|com|pif|scr|vbs|js|jar|app|deb|pkg|dmg)$/i,
  
  // Script files
  /\.(php|asp|aspx|jsp|pl|py|rb|sh|bash)$/i,
  
  // Double extensions
  /\.[^.]+\.(exe|bat|cmd|com|pif|scr|vbs|js|jar|php|asp|aspx|jsp|pl|py|rb|sh)$/i,
  
  // Hidden files or system files
  /^\.ht/i,
  /^\.DS_Store$/i,
  /^Thumbs\.db$/i,
];

// Virus signature patterns (basic detection)
const VIRUS_SIGNATURES = [
  // PE header
  Buffer.from([0x4D, 0x5A]), // MZ header
  
  // ELF header
  Buffer.from([0x7F, 0x45, 0x4C, 0x46]),
  
  // Java class file
  Buffer.from([0xCA, 0xFE, 0xBA, 0xBE]),
  
  // Common malware strings
  Buffer.from('eval('),
  Buffer.from('<script'),
  Buffer.from('<?php'),
  Buffer.from('<%@'),
];

interface UploadOptions {
  maxFiles?: number;
  allowedTypes?: string[];
  maxTotalSize?: number;
  uploadDir?: string;
  requireAuth?: boolean;
}

class FileUploadSecurity {
  /**
   * Validate file type and extension
   */
  static validateFileType(filename: string, mimeType: string): { valid: boolean; reason?: string } {
    // Check if MIME type is allowed
    if (!ALLOWED_FILE_TYPES[mimeType as keyof typeof ALLOWED_FILE_TYPES]) {
      return { valid: false, reason: 'File type not allowed' };
    }
    
    // Get file extension
    const fileExt = path.extname(filename).toLowerCase();
    
    // Check if extension matches MIME type
    const allowedExtensions = ALLOWED_FILE_TYPES[mimeType as keyof typeof ALLOWED_FILE_TYPES];
    if (!allowedExtensions.includes(fileExt)) {
      return { valid: false, reason: 'File extension does not match MIME type' };
    }
    
    return { valid: true };
  }
  
  /**
   * Check for malicious file patterns
   */
  static checkMaliciousPatterns(filename: string): { valid: boolean; reason?: string } {
    for (const pattern of MALICIOUS_PATTERNS) {
      if (pattern.test(filename)) {
        return { valid: false, reason: 'Filename contains malicious pattern' };
      }
    }
    
    return { valid: true };
  }
  
  /**
   * Sanitize filename
   */
  static sanitizeFilename(filename: string): string {
    // Remove path traversal attempts
    const sanitized = path.basename(filename);
    
    // Remove special characters except dot, dash, underscore
    return sanitized.replace(/[^a-zA-Z0-9.-_]/g, '_');
  }
  
  /**
   * Generate secure filename
   */
  static generateSecureFilename(originalname: string): string {
    const ext = path.extname(originalname);
    const timestamp = Date.now();
    const randomString = crypto.randomBytes(8).toString('hex');
    
    return `${timestamp}-${randomString}${ext}`;
  }
  
  /**
   * Check file content for virus signatures
   */
  static async checkVirusSignatures(filepath: string): Promise<{ clean: boolean; reason?: string }> {
    try {
      const fileBuffer = await fs.readFile(filepath);
      
      // Check for virus signatures in first 1KB
      const headerBuffer = fileBuffer.subarray(0, Math.min(1024, fileBuffer.length));
      
      for (const signature of VIRUS_SIGNATURES) {
        if (headerBuffer.includes(signature)) {
          return { clean: false, reason: 'Suspicious file signature detected' };
        }
      }
      
      return { clean: true };
    } catch (error) {
      logger.error('Virus signature check failed', { filepath, error });
      return { clean: false, reason: 'File content validation failed' };
    }
  }
  
  /**
   * Validate image file integrity
   */
  static async validateImageFile(filepath: string, mimeType: string): Promise<{ valid: boolean; reason?: string }> {
    try {
      if (!mimeType.startsWith('image/')) {
        return { valid: true }; // Skip validation for non-images
      }
      
      const fileBuffer = await fs.readFile(filepath);
      
      // Basic image header validation
      switch (mimeType) {
        case 'image/jpeg':
          if (!fileBuffer.subarray(0, 2).equals(Buffer.from([0xFF, 0xD8]))) {
            return { valid: false, reason: 'Invalid JPEG header' };
          }
          break;
          
        case 'image/png':
          if (!fileBuffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]))) {
            return { valid: false, reason: 'Invalid PNG header' };
          }
          break;
          
        case 'image/gif':
          const gifHeader = fileBuffer.subarray(0, 6);
          if (!gifHeader.equals(Buffer.from('GIF87a')) && !gifHeader.equals(Buffer.from('GIF89a'))) {
            return { valid: false, reason: 'Invalid GIF header' };
          }
          break;
      }
      
      return { valid: true };
    } catch (error) {
      return { valid: false, reason: 'Image validation failed' };
    }
  }
}

/**
 * Create secure multer configuration
 */
export function createSecureUpload(options: UploadOptions = {}) {
  const {
    maxFiles = 5,
    allowedTypes = Object.keys(ALLOWED_FILE_TYPES),
    maxTotalSize = 50 * 1024 * 1024, // 50MB total
    uploadDir = 'uploads',
    requireAuth = true
  } = options;
  
  // Ensure upload directory exists
  const fullUploadDir = path.resolve(process.cwd(), uploadDir);
  fs.mkdir(fullUploadDir, { recursive: true }).catch(err => {
    logger.error('Failed to create upload directory', { uploadDir: fullUploadDir, error: err });
  });
  
  const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      try {
        // Create user-specific subdirectory
        const userId = req.user?.id || 'anonymous';
        const userUploadDir = path.join(fullUploadDir, userId);
        await fs.mkdir(userUploadDir, { recursive: true });
        cb(null, userUploadDir);
      } catch (error) {
        cb(error as Error, '');
      }
    },
    
    filename: (req, file, cb) => {
      // Generate secure filename
      const secureFilename = FileUploadSecurity.generateSecureFilename(file.originalname);
      cb(null, secureFilename);
    }
  });
  
  const upload = multer({
    storage,
    
    limits: {
      files: maxFiles,
      fileSize: Math.max(...Object.values(FILE_SIZE_LIMITS)),
      fieldSize: 10 * 1024, // 10KB for form fields
      headerPairs: 20,
    },
    
    fileFilter: (req: Request, file, cb) => {
      // Check if file type is allowed
      if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error('File type not allowed') as any;
        error.code = 'FILETYPE_NOT_ALLOWED';
        return cb(error, false);
      }
      
      // Validate file type consistency
      const typeValidation = FileUploadSecurity.validateFileType(file.originalname, file.mimetype);
      if (!typeValidation.valid) {
        const error = new Error(typeValidation.reason) as any;
        error.code = 'INVALID_FILE_TYPE';
        return cb(error, false);
      }
      
      // Check for malicious patterns
      const patternCheck = FileUploadSecurity.checkMaliciousPatterns(file.originalname);
      if (!patternCheck.valid) {
        const error = new Error(patternCheck.reason) as any;
        error.code = 'MALICIOUS_FILENAME';
        return cb(error, false);
      }
      
      // Check file size limit for specific type
      const sizeLimit = FILE_SIZE_LIMITS[file.mimetype as keyof typeof FILE_SIZE_LIMITS];
      if (sizeLimit && req.headers['content-length'] && parseInt(req.headers['content-length']) > sizeLimit) {
        const error = new Error(`File too large. Maximum size: ${Math.round(sizeLimit / 1024 / 1024)}MB`) as any;
        error.code = 'LIMIT_FILE_SIZE';
        return cb(error, false);
      }
      
      cb(null, true);
    }
  });
  
  return upload;
}

/**
 * Middleware for post-upload security validation
 */
export async function validateUploadedFiles(req: any, res: any, next: any) {
  if (!req.files && !req.file) {
    return next();
  }
  
  const files = req.files ? (Array.isArray(req.files) ? req.files : Object.values(req.files).flat()) : [req.file];
  
  for (const file of files) {
    try {
      // Virus signature check
      const virusCheck = await FileUploadSecurity.checkVirusSignatures(file.path);
      if (!virusCheck.clean) {
        // Delete potentially malicious file
        await fs.unlink(file.path).catch(() => {});
        
        logger.warn('Malicious file upload attempt blocked', {
          filename: file.filename,
          originalname: file.originalname,
          mimetype: file.mimetype,
          reason: virusCheck.reason,
          ip: req.ip,
          userAgent: req.get('User-Agent')
        });
        
        return res.status(400).json({
          error: 'File upload blocked',
          message: virusCheck.reason
        });
      }
      
      // Image validation
      const imageValidation = await FileUploadSecurity.validateImageFile(file.path, file.mimetype);
      if (!imageValidation.valid) {
        // Delete invalid file
        await fs.unlink(file.path).catch(() => {});
        
        return res.status(400).json({
          error: 'Invalid file format',
          message: imageValidation.reason
        });
      }
      
      // Log successful upload
      logger.info('File uploaded successfully', {
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        userId: req.user?.id
      });
      
    } catch (error) {
      logger.error('File validation error', { filename: file.filename, error });
      
      // Delete file on validation error
      await fs.unlink(file.path).catch(() => {});
      
      return res.status(500).json({
        error: 'File validation failed',
        message: 'Unable to process uploaded file'
      });
    }
  }
  
  next();
}

/**
 * Cleanup old uploaded files
 */
export async function cleanupOldFiles(maxAgeHours: number = 24): Promise<number> {
  const uploadDir = path.resolve(process.cwd(), 'uploads');
  let deletedCount = 0;
  
  try {
    const maxAge = Date.now() - (maxAgeHours * 60 * 60 * 1000);
    
    async function processDirectory(dir: string) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          await processDirectory(fullPath);
        } else if (entry.isFile()) {
          const stats = await fs.stat(fullPath);
          if (stats.mtime.getTime() < maxAge) {
            await fs.unlink(fullPath);
            deletedCount++;
          }
        }
      }
    }
    
    await processDirectory(uploadDir);
    
    if (deletedCount > 0) {
      logger.info('Cleaned up old uploaded files', { deletedCount, maxAgeHours });
    }
    
  } catch (error) {
    logger.error('Failed to cleanup old files', error);
  }
  
  return deletedCount;
}

export { FileUploadSecurity };