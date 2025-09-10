import express from 'express';
import { requireAuth } from '../middleware/session.middleware';
import { createSecureUpload, validateUploadedFiles, cleanupOldFiles } from '../middleware/upload.middleware';
import { logger } from '../logger';
import path from 'path';
import fs from 'fs/promises';

const router = express.Router();

// Property photos upload (for listing photos)
const propertyPhotosUpload = createSecureUpload({
  maxFiles: 20,
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  maxTotalSize: 100 * 1024 * 1024, // 100MB total
  uploadDir: 'uploads/properties',
  requireAuth: true
});

// Property documents upload (for property-related documents)
const propertyDocumentsUpload = createSecureUpload({
  maxFiles: 10,
  allowedTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ],
  maxTotalSize: 50 * 1024 * 1024, // 50MB total
  uploadDir: 'uploads/documents',
  requireAuth: true
});

// General file upload (for user profile, etc.)
const generalUpload = createSecureUpload({
  maxFiles: 5,
  allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
  maxTotalSize: 25 * 1024 * 1024, // 25MB total
  uploadDir: 'uploads/general',
  requireAuth: false
});

/**
 * Upload property photos
 * POST /api/upload/property/photos
 */
router.post('/property/photos', requireAuth, (req, res, next) => {
  propertyPhotosUpload.array('photos', 20)(req, res, (err) => {
    if (err) {
      logger.warn('Property photos upload error', {
        error: err.message,
        code: err.code,
        userId: req.user?.id,
        ip: req.ip
      });
      
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          error: 'File too large',
          message: 'Image files must be under 10MB each'
        });
      } else if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          error: 'Too many files',
          message: 'Maximum 20 photos allowed'
        });
      } else if (err.code === 'FILETYPE_NOT_ALLOWED') {
        return res.status(400).json({
          error: 'Invalid file type',
          message: 'Only JPEG, PNG, and WebP images are allowed'
        });
      }
      
      return res.status(400).json({
        error: 'Upload failed',
        message: err.message
      });
    }
    
    next();
  });
}, validateUploadedFiles, async (req: any, res) => {
  try {
    const uploadedFiles = req.files?.map((file: any) => ({
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
      url: `/uploads/properties/${req.user.id}/${file.filename}`
    })) || [];
    
    res.json({
      success: true,
      message: `Successfully uploaded ${uploadedFiles.length} photo(s)`,
      files: uploadedFiles
    });
    
  } catch (error) {
    logger.error('Property photos upload response error', error);
    res.status(500).json({
      error: 'Upload processing failed',
      message: 'Unable to process uploaded photos'
    });
  }
});

/**
 * Upload property documents
 * POST /api/upload/property/documents
 */
router.post('/property/documents', requireAuth, (req, res, next) => {
  propertyDocumentsUpload.array('documents', 10)(req, res, (err) => {
    if (err) {
      logger.warn('Property documents upload error', {
        error: err.message,
        code: err.code,
        userId: req.user?.id,
        ip: req.ip
      });
      
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          error: 'File too large',
          message: 'Document files must be under 25MB each'
        });
      } else if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          error: 'Too many files',
          message: 'Maximum 10 documents allowed'
        });
      } else if (err.code === 'FILETYPE_NOT_ALLOWED') {
        return res.status(400).json({
          error: 'Invalid file type',
          message: 'Only PDF, Word, and Excel documents are allowed'
        });
      }
      
      return res.status(400).json({
        error: 'Upload failed',
        message: err.message
      });
    }
    
    next();
  });
}, validateUploadedFiles, async (req: any, res) => {
  try {
    const uploadedFiles = req.files?.map((file: any) => ({
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
      url: `/uploads/documents/${req.user.id}/${file.filename}`
    })) || [];
    
    res.json({
      success: true,
      message: `Successfully uploaded ${uploadedFiles.length} document(s)`,
      files: uploadedFiles
    });
    
  } catch (error) {
    logger.error('Property documents upload response error', error);
    res.status(500).json({
      error: 'Upload processing failed',
      message: 'Unable to process uploaded documents'
    });
  }
});

/**
 * General file upload (profile pictures, etc.)
 * POST /api/upload/general
 */
router.post('/general', (req, res, next) => {
  generalUpload.array('files', 5)(req, res, (err) => {
    if (err) {
      logger.warn('General upload error', {
        error: err.message,
        code: err.code,
        ip: req.ip
      });
      
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          error: 'File too large',
          message: 'Files must be under 10MB each'
        });
      } else if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          error: 'Too many files',
          message: 'Maximum 5 files allowed'
        });
      } else if (err.code === 'FILETYPE_NOT_ALLOWED') {
        return res.status(400).json({
          error: 'Invalid file type',
          message: 'Only JPEG, PNG images and PDF documents are allowed'
        });
      }
      
      return res.status(400).json({
        error: 'Upload failed',
        message: err.message
      });
    }
    
    next();
  });
}, validateUploadedFiles, async (req: any, res) => {
  try {
    const uploadedFiles = req.files?.map((file: any) => ({
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
      url: `/uploads/general/${req.user?.id || 'anonymous'}/${file.filename}`
    })) || [];
    
    res.json({
      success: true,
      message: `Successfully uploaded ${uploadedFiles.length} file(s)`,
      files: uploadedFiles
    });
    
  } catch (error) {
    logger.error('General upload response error', error);
    res.status(500).json({
      error: 'Upload processing failed',
      message: 'Unable to process uploaded files'
    });
  }
});

/**
 * Delete uploaded file
 * DELETE /api/upload/:category/:userId/:filename
 */
router.delete('/:category/:userId/:filename', requireAuth, async (req: any, res) => {
  try {
    const { category, userId, filename } = req.params;
    
    // Security check: users can only delete their own files (or admin can delete any)
    if (req.user.id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You can only delete your own files'
      });
    }
    
    // Validate category
    const allowedCategories = ['properties', 'documents', 'general'];
    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        error: 'Invalid category',
        message: 'Category must be one of: ' + allowedCategories.join(', ')
      });
    }
    
    // Construct file path
    const filePath = path.join(process.cwd(), 'uploads', category, userId, filename);
    
    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return res.status(404).json({
        error: 'File not found',
        message: 'The specified file does not exist'
      });
    }
    
    // Delete file
    await fs.unlink(filePath);
    
    logger.info('File deleted successfully', {
      category,
      userId,
      filename,
      deletedBy: req.user.id
    });
    
    res.json({
      success: true,
      message: 'File deleted successfully'
    });
    
  } catch (error) {
    logger.error('File deletion error', {
      params: req.params,
      userId: req.user?.id,
      error
    });
    
    res.status(500).json({
      error: 'Deletion failed',
      message: 'Unable to delete file'
    });
  }
});

/**
 * List user's uploaded files
 * GET /api/upload/list/:category?
 */
router.get('/list/:category?', requireAuth, async (req: any, res) => {
  try {
    const { category } = req.params;
    const userId = req.user.id;
    
    const basePath = path.join(process.cwd(), 'uploads');
    const files: any[] = [];
    
    const categoriesToCheck = category ? [category] : ['properties', 'documents', 'general'];
    
    for (const cat of categoriesToCheck) {
      const categoryPath = path.join(basePath, cat, userId);
      
      try {
        const fileNames = await fs.readdir(categoryPath);
        
        for (const fileName of fileNames) {
          const filePath = path.join(categoryPath, fileName);
          const stats = await fs.stat(filePath);
          
          files.push({
            category: cat,
            filename: fileName,
            size: stats.size,
            uploadedAt: stats.birthtime,
            url: `/uploads/${cat}/${userId}/${fileName}`
          });
        }
      } catch {
        // Directory doesn't exist or is empty, skip
        continue;
      }
    }
    
    res.json({
      success: true,
      files: files.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
    });
    
  } catch (error) {
    logger.error('File listing error', {
      userId: req.user?.id,
      category: req.params.category,
      error
    });
    
    res.status(500).json({
      error: 'Listing failed',
      message: 'Unable to list files'
    });
  }
});

/**
 * Cleanup old files (admin only)
 * POST /api/upload/cleanup
 */
router.post('/cleanup', requireAuth, async (req: any, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Admin access required'
      });
    }
    
    const { maxAgeHours = 24 } = req.body;
    
    const deletedCount = await cleanupOldFiles(maxAgeHours);
    
    res.json({
      success: true,
      message: `Cleanup completed. Deleted ${deletedCount} old files.`,
      deletedCount,
      maxAgeHours
    });
    
  } catch (error) {
    logger.error('File cleanup error', { userId: req.user?.id, error });
    
    res.status(500).json({
      error: 'Cleanup failed',
      message: 'Unable to cleanup old files'
    });
  }
});

export default router;