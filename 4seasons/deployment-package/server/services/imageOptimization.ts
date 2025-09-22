import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { logger } from '../logger';

interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'avif';
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  progressive?: boolean;
  lossless?: boolean;
}

interface ResizeConfig {
  width: number;
  height?: number;
  suffix: string;
}

export class ImageOptimizationService {
  private readonly inputDir: string;
  private readonly outputDir: string;
  private readonly cacheDir: string;

  constructor() {
    this.inputDir = path.join(process.cwd(), 'client/src/assets/images');
    this.outputDir = path.join(process.cwd(), 'client/public/optimized-images');
    this.cacheDir = path.join(process.cwd(), 'cache/images');
    
    this.ensureDirectories();
  }

  private async ensureDirectories(): Promise<void> {
    try {
      await fs.mkdir(this.outputDir, { recursive: true });
      await fs.mkdir(this.cacheDir, { recursive: true });
    } catch (error) {
      logger.error('Failed to create image directories', error);
    }
  }

  /**
   * Optimize a single image with given options
   */
  async optimizeImage(
    inputPath: string,
    outputPath: string,
    options: ImageOptimizationOptions = {}
  ): Promise<string> {
    try {
      const {
        width,
        height,
        quality = 85,
        format = 'webp',
        fit = 'cover',
        progressive = true,
        lossless = false
      } = options;

      let pipeline = sharp(inputPath);

      // Resize if dimensions specified
      if (width || height) {
        pipeline = pipeline.resize(width, height, { fit });
      }

      // Auto-orient based on EXIF data
      pipeline = pipeline.rotate();

      // Apply format-specific optimizations
      switch (format) {
        case 'webp':
          pipeline = pipeline.webp({
            quality,
            lossless,
            effort: 6, // Maximum compression effort
          });
          break;
        
        case 'jpeg':
          pipeline = pipeline.jpeg({
            quality,
            progressive,
            mozjpeg: true, // Use mozjpeg for better compression
          });
          break;
        
        case 'png':
          pipeline = pipeline.png({
            quality,
            compressionLevel: 9,
            progressive,
          });
          break;
        
        case 'avif':
          pipeline = pipeline.avif({
            quality,
            lossless,
            effort: 9,
          });
          break;
      }

      // Ensure output directory exists
      await fs.mkdir(path.dirname(outputPath), { recursive: true });

      // Process and save
      await pipeline.toFile(outputPath);

      // Get file size info
      const stats = await fs.stat(outputPath);
      const originalStats = await fs.stat(inputPath);
      const compressionRatio = ((originalStats.size - stats.size) / originalStats.size * 100).toFixed(1);

      logger.info('Image optimized', {
        input: inputPath,
        output: outputPath,
        originalSize: originalStats.size,
        optimizedSize: stats.size,
        compressionRatio: `${compressionRatio}%`,
        format,
        quality
      });

      return outputPath;
    } catch (error) {
      logger.error('Image optimization failed', { error, inputPath, outputPath });
      throw error;
    }
  }

  /**
   * Generate multiple responsive sizes for an image
   */
  async generateResponsiveImages(
    inputPath: string,
    baseOutputPath: string,
    configs: ResizeConfig[] = [
      { width: 480, suffix: '_480w' },
      { width: 768, suffix: '_768w' },
      { width: 1024, suffix: '_1024w' },
      { width: 1200, suffix: '_1200w' },
      { width: 1920, suffix: '_1920w' }
    ]
  ): Promise<string[]> {
    const results: string[] = [];

    for (const config of configs) {
      const { width, height, suffix } = config;
      const ext = path.extname(baseOutputPath);
      const baseName = path.basename(baseOutputPath, ext);
      const dir = path.dirname(baseOutputPath);
      const outputPath = path.join(dir, `${baseName}${suffix}${ext}`);

      try {
        await this.optimizeImage(inputPath, outputPath, {
          width,
          height,
          format: 'webp'
        });
        results.push(outputPath);
      } catch (error) {
        logger.error('Failed to generate responsive image', { error, config, inputPath });
      }
    }

    return results;
  }

  /**
   * Batch optimize all images in a directory
   */
  async optimizeDirectory(
    inputDir: string,
    outputDir: string,
    options: ImageOptimizationOptions = {}
  ): Promise<void> {
    try {
      const files = await fs.readdir(inputDir);
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif'];

      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        
        if (!imageExtensions.includes(ext)) continue;

        const inputPath = path.join(inputDir, file);
        const baseName = path.basename(file, ext);
        const outputPath = path.join(outputDir, `${baseName}.webp`);

        // Check if optimized version already exists and is newer
        try {
          const inputStats = await fs.stat(inputPath);
          const outputStats = await fs.stat(outputPath);
          
          if (outputStats.mtime > inputStats.mtime) {
            logger.debug('Skipping already optimized image', { file });
            continue;
          }
        } catch {
          // Output doesn't exist, proceed with optimization
        }

        await this.optimizeImage(inputPath, outputPath, options);
      }

      logger.info('Directory optimization completed', { inputDir, outputDir });
    } catch (error) {
      logger.error('Directory optimization failed', { error, inputDir, outputDir });
      throw error;
    }
  }

  /**
   * Create a placeholder/blur image for progressive loading
   */
  async createPlaceholder(
    inputPath: string,
    outputPath: string,
    size: number = 20
  ): Promise<string> {
    try {
      await sharp(inputPath)
        .resize(size, size, { fit: 'cover' })
        .blur(1)
        .jpeg({ quality: 20 })
        .toFile(outputPath);

      logger.debug('Placeholder created', { inputPath, outputPath, size });
      return outputPath;
    } catch (error) {
      logger.error('Placeholder creation failed', { error, inputPath });
      throw error;
    }
  }

  /**
   * Get image metadata
   */
  async getImageMetadata(imagePath: string): Promise<sharp.Metadata> {
    try {
      const metadata = await sharp(imagePath).metadata();
      return metadata;
    } catch (error) {
      logger.error('Failed to get image metadata', { error, imagePath });
      throw error;
    }
  }

  /**
   * Convert all existing images to WebP format
   */
  async convertToWebP(quality: number = 85): Promise<void> {
    try {
      const files = await fs.readdir(this.inputDir);
      const imageFiles = files.filter(file => 
        ['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase())
      );

      logger.info('Starting WebP conversion', { count: imageFiles.length });

      for (const file of imageFiles) {
        const inputPath = path.join(this.inputDir, file);
        const baseName = path.basename(file, path.extname(file));
        const outputPath = path.join(this.outputDir, `${baseName}.webp`);

        await this.optimizeImage(inputPath, outputPath, {
          format: 'webp',
          quality
        });

        // Also generate responsive versions
        await this.generateResponsiveImages(inputPath, outputPath);
      }

      logger.info('WebP conversion completed');
    } catch (error) {
      logger.error('WebP conversion failed', error);
      throw error;
    }
  }

  /**
   * Clean up old optimized images
   */
  async cleanup(olderThanDays: number = 30): Promise<void> {
    try {
      const files = await fs.readdir(this.outputDir);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

      for (const file of files) {
        const filePath = path.join(this.outputDir, file);
        const stats = await fs.stat(filePath);

        if (stats.mtime < cutoffDate) {
          await fs.unlink(filePath);
          logger.info('Cleaned up old optimized image', { file });
        }
      }
    } catch (error) {
      logger.error('Cleanup failed', error);
    }
  }
}

// Export singleton instance
export const imageOptimizer = new ImageOptimizationService();