import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { readFileSync, existsSync, statSync } from 'fs';
import { glob } from 'glob';
import path from 'path';

interface ImageOptimizationTestResult {
  originalPath: string;
  optimizedVariants: string[];
  compressionRatio: number;
  webpSupport: boolean;
  responsiveVariants: string[];
  issues: string[];
}

interface ImageOptimizationReport {
  totalImages: number;
  optimizedImages: number;
  compressionSavings: number;
  webpCoverage: number;
  responsiveCoverage: number;
  results: ImageOptimizationTestResult[];
  recommendations: string[];
}

const ASSETS_DIR = path.join(__dirname, '..', '4seasons', 'client', 'src', 'assets', 'images');
const BUILD_DIR = path.join(__dirname, '..', '4seasons', 'server', 'public');
const EXPECTED_VARIANTS = ['_480w', '_768w', '_1024w', '_1920w'];
const MAX_ACCEPTABLE_SIZE_MB = 2;
const MIN_COMPRESSION_RATIO = 0.3; // Should compress to at least 30% of original size

describe('Image Optimization Tests', () => {
  let report: ImageOptimizationReport;

  beforeAll(async () => {
    report = {
      totalImages: 0,
      optimizedImages: 0,
      compressionSavings: 0,
      webpCoverage: 0,
      responsiveCoverage: 0,
      results: [],
      recommendations: []
    };
  });

  afterAll(() => {
    // Generate summary report
    report.webpCoverage = (report.results.filter(r => r.webpSupport).length / report.totalImages) * 100;
    report.responsiveCoverage = (report.results.filter(r => r.responsiveVariants.length > 0).length / report.totalImages) * 100;

    console.log('\n📸 Image Optimization Report:');
    console.log(`Total images analyzed: ${report.totalImages}`);
    console.log(`Images with optimization: ${report.optimizedImages}`);
    console.log(`Average compression savings: ${report.compressionSavings.toFixed(1)}%`);
    console.log(`WebP coverage: ${report.webpCoverage.toFixed(1)}%`);
    console.log(`Responsive variants coverage: ${report.responsiveCoverage.toFixed(1)}%`);

    if (report.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      report.recommendations.forEach((rec, index) => {
        console.log(`${index + 1}. ${rec}`);
      });
    }

    // Write detailed report
    const fs = require('fs');
    const reportPath = path.join(__dirname, '..', 'test-results', 'image-optimization-report.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  });

  it('should discover and analyze all images in assets directory', async () => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];
    const imagePattern = `**/*.{${imageExtensions.join(',')}}`;

    const imageFiles = await glob(imagePattern, { cwd: ASSETS_DIR });
    expect(imageFiles.length).toBeGreaterThan(0);

    report.totalImages = imageFiles.length;

    for (const imagePath of imageFiles) {
      const fullPath = path.join(ASSETS_DIR, imagePath);
      const result = await analyzeImage(fullPath, imagePath);
      report.results.push(result);

      if (result.optimizedVariants.length > 0 || result.webpSupport) {
        report.optimizedImages++;
      }

      // Accumulate compression savings
      if (result.compressionRatio > 0) {
        report.compressionSavings += (1 - result.compressionRatio) * 100;
      }
    }

    // Calculate average compression
    if (report.optimizedImages > 0) {
      report.compressionSavings = report.compressionSavings / report.optimizedImages;
    }
  });

  it('should have WebP variants for hero images', async () => {
    const heroImages = report.results.filter(r =>
      r.originalPath.includes('hero') ||
      r.originalPath.includes('plano') ||
      r.originalPath.includes('allen') ||
      r.originalPath.includes('frisco')
    );

    for (const heroImage of heroImages) {
      expect(heroImage.webpSupport, `Hero image ${heroImage.originalPath} should have WebP variant`).toBe(true);
    }

    if (heroImages.length === 0) {
      console.warn('⚠️ No hero images found for WebP testing');
    }
  });

  it('should have responsive variants for large images', async () => {
    for (const result of report.results) {
      const imagePath = path.join(ASSETS_DIR, result.originalPath);

      if (existsSync(imagePath)) {
        const stats = statSync(imagePath);
        const sizeInMB = stats.size / (1024 * 1024);

        // Large images should have responsive variants
        if (sizeInMB > 0.5) {
          expect(result.responsiveVariants.length,
            `Large image ${result.originalPath} (${sizeInMB.toFixed(2)}MB) should have responsive variants`
          ).toBeGreaterThan(0);
        }
      }
    }
  });

  it('should not have excessively large image files', async () => {
    const oversizedImages: string[] = [];

    for (const result of report.results) {
      const imagePath = path.join(ASSETS_DIR, result.originalPath);

      if (existsSync(imagePath)) {
        const stats = statSync(imagePath);
        const sizeInMB = stats.size / (1024 * 1024);

        if (sizeInMB > MAX_ACCEPTABLE_SIZE_MB) {
          oversizedImages.push(`${result.originalPath} (${sizeInMB.toFixed(2)}MB)`);
        }
      }
    }

    if (oversizedImages.length > 0) {
      console.warn('⚠️ Oversized images found:', oversizedImages);
      report.recommendations.push(`Optimize oversized images: ${oversizedImages.join(', ')}`);
    }

    expect(oversizedImages.length).toBe(0);
  });

  it('should have optimized images in build directory', async () => {
    if (!existsSync(BUILD_DIR)) {
      console.warn('⚠️ Build directory not found, skipping build optimization tests');
      return;
    }

    const builtImages = await glob('**/*.{jpg,jpeg,png,webp}', { cwd: BUILD_DIR });

    if (builtImages.length === 0) {
      console.warn('⚠️ No images found in build directory');
      return;
    }

    // Check for WebP variants in build
    const webpImages = builtImages.filter(img => img.endsWith('.webp'));
    const originalImages = builtImages.filter(img => !img.endsWith('.webp'));

    const webpRatio = webpImages.length / originalImages.length;
    expect(webpRatio).toBeGreaterThan(0.3); // At least 30% should have WebP variants

    console.log(`Found ${webpImages.length} WebP images out of ${originalImages.length} total images in build`);
  });

  it('should validate OptimizedImage component integration', async () => {
    // Check if OptimizedImage component is properly implemented
    const optimizedImagePath = path.join(__dirname, '..', '4seasons', 'client', 'src', 'components', 'ui', 'optimized-image.tsx');

    expect(existsSync(optimizedImagePath), 'OptimizedImage component should exist').toBe(true);

    const componentContent = readFileSync(optimizedImagePath, 'utf-8');

    // Check for key optimization features
    expect(componentContent).toContain('loading="lazy"');
    expect(componentContent).toContain('webp');
    expect(componentContent).toContain('srcSet');
    expect(componentContent).toContain('IntersectionObserver');

    console.log('✅ OptimizedImage component has required optimization features');
  });

  it('should have proper alt text patterns', async () => {
    const imagesWithoutAlt: string[] = [];

    // Check image usage in pages
    const pageFiles = await glob('**/*.tsx', {
      cwd: path.join(__dirname, '..', '4seasons', 'client', 'src', 'pages')
    });

    for (const pageFile of pageFiles) {
      const fullPath = path.join(__dirname, '..', '4seasons', 'client', 'src', 'pages', pageFile);
      const content = readFileSync(fullPath, 'utf-8');

      // Check for img tags or OptimizedImage components without alt text
      const imgMatches = content.match(/<(?:img|OptimizedImage)[^>]*>/g) || [];

      for (const imgTag of imgMatches) {
        if (!imgTag.includes('alt=')) {
          imagesWithoutAlt.push(`${pageFile}: ${imgTag.substring(0, 100)}`);
        } else {
          // Check for empty or generic alt text
          const altMatch = imgTag.match(/alt=["']([^"']*)["']/);
          if (altMatch) {
            const altText = altMatch[1].toLowerCase();
            if (!altText || altText === 'image' || altText === 'photo' || altText === 'picture') {
              imagesWithoutAlt.push(`${pageFile}: Generic alt text - ${altText}`);
            }
          }
        }
      }
    }

    if (imagesWithoutAlt.length > 0) {
      console.warn('⚠️ Images with missing or poor alt text:', imagesWithoutAlt);
      report.recommendations.push('Add descriptive alt text to all images for better SEO and accessibility');
    }

    expect(imagesWithoutAlt.length).toBe(0);
  });

  it('should validate Vite image optimization configuration', async () => {
    const viteConfigPath = path.join(__dirname, '..', '4seasons', 'vite.config.ts');

    if (existsSync(viteConfigPath)) {
      const configContent = readFileSync(viteConfigPath, 'utf-8');

      // Check for image optimization plugins
      const hasImageOptimization =
        configContent.includes('vite-plugin-imagemin') ||
        configContent.includes('vite-imagetools') ||
        configContent.includes('unplugin-imagemin');

      if (!hasImageOptimization) {
        report.recommendations.push('Consider adding Vite image optimization plugins for automatic compression');
        console.warn('⚠️ No image optimization plugins detected in Vite config');
      } else {
        console.log('✅ Image optimization plugins detected in Vite config');
      }
    }
  });

  it('should check for unused images', async () => {
    const allImages = await glob('**/*.{jpg,jpeg,png,webp,gif,svg}', { cwd: ASSETS_DIR });
    const usedImages = new Set<string>();

    // Scan all code files for image imports and references
    const codeFiles = await glob('**/*.{tsx,ts,js,jsx,css,scss}', {
      cwd: path.join(__dirname, '..', '4seasons', 'client', 'src')
    });

    for (const codeFile of codeFiles) {
      const fullPath = path.join(__dirname, '..', '4seasons', 'client', 'src', codeFile);
      const content = readFileSync(fullPath, 'utf-8');

      // Look for image imports and references
      for (const imagePath of allImages) {
        const imageName = path.basename(imagePath);
        const imageNameWithoutExt = path.basename(imagePath, path.extname(imagePath));

        if (content.includes(imageName) || content.includes(imageNameWithoutExt)) {
          usedImages.add(imagePath);
        }
      }
    }

    const unusedImages = allImages.filter(img => !usedImages.has(img));

    if (unusedImages.length > 0) {
      console.warn('⚠️ Potentially unused images:', unusedImages);
      report.recommendations.push(`Consider removing unused images: ${unusedImages.slice(0, 3).join(', ')}${unusedImages.length > 3 ? '...' : ''}`);
    }

    // Don't fail the test for unused images, just warn
    console.log(`Image usage: ${usedImages.size}/${allImages.length} images are referenced in code`);
  });
});

async function analyzeImage(fullPath: string, relativePath: string): Promise<ImageOptimizationTestResult> {
  const result: ImageOptimizationTestResult = {
    originalPath: relativePath,
    optimizedVariants: [],
    compressionRatio: 0,
    webpSupport: false,
    responsiveVariants: [],
    issues: []
  };

  if (!existsSync(fullPath)) {
    result.issues.push('File not found');
    return result;
  }

  const stats = statSync(fullPath);
  const ext = path.extname(fullPath);
  const baseName = path.basename(fullPath, ext);
  const dir = path.dirname(fullPath);

  // Check for WebP variant
  const webpPath = path.join(dir, `${baseName}.webp`);
  if (existsSync(webpPath)) {
    result.webpSupport = true;
    result.optimizedVariants.push(`${baseName}.webp`);

    // Calculate compression ratio
    const webpStats = statSync(webpPath);
    result.compressionRatio = webpStats.size / stats.size;
  }

  // Check for responsive variants
  for (const variant of EXPECTED_VARIANTS) {
    const variantPath = path.join(dir, `${baseName}${variant}${ext}`);
    if (existsSync(variantPath)) {
      result.responsiveVariants.push(`${baseName}${variant}${ext}`);
    }

    // Also check WebP variants
    const webpVariantPath = path.join(dir, `${baseName}${variant}.webp`);
    if (existsSync(webpVariantPath)) {
      result.responsiveVariants.push(`${baseName}${variant}.webp`);
    }
  }

  // Check file size
  const sizeInMB = stats.size / (1024 * 1024);
  if (sizeInMB > MAX_ACCEPTABLE_SIZE_MB) {
    result.issues.push(`Large file size: ${sizeInMB.toFixed(2)}MB`);
  }

  // Check if compression ratio is acceptable
  if (result.compressionRatio > 0 && result.compressionRatio > (1 - MIN_COMPRESSION_RATIO)) {
    result.issues.push(`Poor compression ratio: ${(result.compressionRatio * 100).toFixed(1)}%`);
  }

  return result;
}