#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

// Configuration
const config = {
  buildDir: path.join(__dirname, '..', 'server', 'public'),
  outputFile: path.join(__dirname, '..', 'bundle-analysis.json'),
  htmlReport: path.join(__dirname, '..', 'bundle-analysis.html'),
  thresholds: {
    totalSizeWarning: 1024 * 1024, // 1MB
    totalSizeCritical: 2048 * 1024, // 2MB
    chunkSizeWarning: 512 * 1024, // 512KB
    chunkSizeCritical: 1024 * 1024, // 1MB
    redundancyThreshold: 0.1 // 10% size redundancy
  }
};

class BundleAnalyzer {
  constructor() {
    this.analysis = {
      timestamp: new Date().toISOString(),
      totalSize: 0,
      gzippedSize: 0,
      files: [],
      chunks: {},
      redundancy: [],
      recommendations: [],
      performance: {
        score: 0,
        warnings: [],
        errors: []
      }
    };
  }

  async analyze() {
    console.log('🔍 Starting bundle analysis...');

    try {
      await this.scanBuildDirectory();
      this.analyzeChunks();
      this.detectRedundancy();
      this.generateRecommendations();
      this.calculatePerformanceScore();
      await this.generateReports();

      console.log('✅ Bundle analysis completed successfully');
      console.log(`📊 Total bundle size: ${this.formatSize(this.analysis.totalSize)}`);
      console.log(`🗜️  Estimated gzipped: ${this.formatSize(this.analysis.gzippedSize)}`);
      console.log(`📈 Performance score: ${this.analysis.performance.score}/100`);

      return this.analysis;
    } catch (error) {
      console.error('❌ Bundle analysis failed:', error);
      throw error;
    }
  }

  async scanBuildDirectory() {
    if (!fs.existsSync(config.buildDir)) {
      throw new Error(`Build directory not found: ${config.buildDir}`);
    }

    const files = await this.getFilesRecursively(config.buildDir);

    for (const filePath of files) {
      const relativePath = path.relative(config.buildDir, filePath);
      const stats = fs.statSync(filePath);
      const ext = path.extname(filePath).toLowerCase();

      // Skip directories and non-relevant files
      if (!stats.isFile() || this.shouldSkipFile(ext)) {
        continue;
      }

      const fileAnalysis = {
        path: relativePath,
        size: stats.size,
        gzippedSize: await this.estimateGzippedSize(filePath),
        type: this.getFileType(ext),
        hash: this.extractHashFromFilename(relativePath),
        isChunk: this.isChunkFile(relativePath),
        lastModified: stats.mtime
      };

      this.analysis.files.push(fileAnalysis);
      this.analysis.totalSize += fileAnalysis.size;
      this.analysis.gzippedSize += fileAnalysis.gzippedSize;
    }
  }

  async getFilesRecursively(dir) {
    const files = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        files.push(...await this.getFilesRecursively(fullPath));
      } else {
        files.push(fullPath);
      }
    }

    return files;
  }

  shouldSkipFile(ext) {
    const skipExtensions = ['.map', '.txt', '.LICENSE', '.md'];
    return skipExtensions.includes(ext);
  }

  getFileType(ext) {
    const typeMap = {
      '.js': 'javascript',
      '.css': 'stylesheet',
      '.png': 'image',
      '.jpg': 'image',
      '.jpeg': 'image',
      '.gif': 'image',
      '.svg': 'image',
      '.webp': 'image',
      '.woff': 'font',
      '.woff2': 'font',
      '.ttf': 'font',
      '.eot': 'font',
      '.ico': 'icon',
      '.html': 'document'
    };
    return typeMap[ext] || 'other';
  }

  extractHashFromFilename(filename) {
    const hashMatch = filename.match(/-([a-f0-9]{8,})\./);
    return hashMatch ? hashMatch[1] : null;
  }

  isChunkFile(filename) {
    return filename.includes('/js/') && filename.endsWith('.js') && this.extractHashFromFilename(filename);
  }

  async estimateGzippedSize(filePath) {
    try {
      const content = fs.readFileSync(filePath);
      // Simple estimation: gzip typically reduces by 60-80% for text files
      const ext = path.extname(filePath).toLowerCase();
      if (['.js', '.css', '.html', '.json'].includes(ext)) {
        return Math.round(content.length * 0.3); // 70% compression estimate
      } else {
        return content.length; // No compression for binary files
      }
    } catch (error) {
      return 0;
    }
  }

  analyzeChunks() {
    const jsFiles = this.analysis.files.filter(f => f.type === 'javascript');

    // Group by chunk type
    const chunkTypes = {
      vendor: jsFiles.filter(f => f.path.includes('vendor')),
      ui: jsFiles.filter(f => f.path.includes('ui')),
      router: jsFiles.filter(f => f.path.includes('router')),
      query: jsFiles.filter(f => f.path.includes('query')),
      icons: jsFiles.filter(f => f.path.includes('icons')),
      main: jsFiles.filter(f => f.path.includes('index') || f.path.includes('main')),
      async: jsFiles.filter(f => f.isChunk && !['vendor', 'ui', 'router', 'query', 'icons'].some(type => f.path.includes(type)))
    };

    for (const [type, files] of Object.entries(chunkTypes)) {
      if (files.length > 0) {
        const totalSize = files.reduce((sum, f) => sum + f.size, 0);
        const gzippedSize = files.reduce((sum, f) => sum + f.gzippedSize, 0);

        this.analysis.chunks[type] = {
          files: files.length,
          size: totalSize,
          gzippedSize,
          percentage: (totalSize / this.analysis.totalSize) * 100,
          status: this.getChunkStatus(totalSize)
        };

        // Check for performance issues
        if (totalSize > config.thresholds.chunkSizeCritical) {
          this.analysis.performance.errors.push(`${type} chunk is too large (${this.formatSize(totalSize)})`);
        } else if (totalSize > config.thresholds.chunkSizeWarning) {
          this.analysis.performance.warnings.push(`${type} chunk is large (${this.formatSize(totalSize)})`);
        }
      }
    }
  }

  getChunkStatus(size) {
    if (size > config.thresholds.chunkSizeCritical) return 'critical';
    if (size > config.thresholds.chunkSizeWarning) return 'warning';
    return 'good';
  }

  detectRedundancy() {
    const filesBySize = new Map();

    this.analysis.files.forEach(file => {
      const sizeKey = file.size;
      if (!filesBySize.has(sizeKey)) {
        filesBySize.set(sizeKey, []);
      }
      filesBySize.get(sizeKey).push(file);
    });

    for (const [size, files] of filesBySize) {
      if (files.length > 1 && size > 1024) { // Only check files > 1KB
        // Check if files might be duplicates (same size, different hash)
        const uniqueHashes = new Set(files.map(f => f.hash).filter(Boolean));
        if (uniqueHashes.size < files.length) {
          this.analysis.redundancy.push({
            size,
            files: files.map(f => f.path),
            potentialSavings: size * (files.length - 1),
            type: 'duplicate_content'
          });
        }
      }
    }

    // Calculate redundancy percentage
    const totalRedundancy = this.analysis.redundancy.reduce((sum, r) => sum + r.potentialSavings, 0);
    const redundancyPercentage = totalRedundancy / this.analysis.totalSize;

    if (redundancyPercentage > config.thresholds.redundancyThreshold) {
      this.analysis.performance.warnings.push(`High redundancy detected: ${this.formatSize(totalRedundancy)} could be saved`);
    }
  }

  generateRecommendations() {
    const recommendations = [];

    // Size-based recommendations
    if (this.analysis.totalSize > config.thresholds.totalSizeCritical) {
      recommendations.push({
        type: 'critical',
        category: 'Bundle Size',
        message: 'Total bundle size is critical. Consider code splitting and lazy loading.',
        impact: 'high'
      });
    } else if (this.analysis.totalSize > config.thresholds.totalSizeWarning) {
      recommendations.push({
        type: 'warning',
        category: 'Bundle Size',
        message: 'Total bundle size is large. Consider optimizing imports and removing unused code.',
        impact: 'medium'
      });
    }

    // Chunk-specific recommendations
    Object.entries(this.analysis.chunks).forEach(([chunkType, chunk]) => {
      if (chunk.status === 'critical') {
        recommendations.push({
          type: 'critical',
          category: 'Chunk Optimization',
          message: `${chunkType} chunk is too large. Consider splitting or tree-shaking.`,
          impact: 'high'
        });
      }
    });

    // Image optimization recommendations
    const images = this.analysis.files.filter(f => f.type === 'image');
    const largeImages = images.filter(f => f.size > 100 * 1024); // > 100KB
    if (largeImages.length > 0) {
      recommendations.push({
        type: 'warning',
        category: 'Image Optimization',
        message: `${largeImages.length} large images found. Consider using WebP format and optimization.`,
        impact: 'medium'
      });
    }

    // Redundancy recommendations
    if (this.analysis.redundancy.length > 0) {
      recommendations.push({
        type: 'warning',
        category: 'Code Duplication',
        message: 'Duplicate or similar files detected. Review chunk splitting strategy.',
        impact: 'medium'
      });
    }

    this.analysis.recommendations = recommendations;
  }

  calculatePerformanceScore() {
    let score = 100;

    // Deduct points for size issues
    if (this.analysis.totalSize > config.thresholds.totalSizeCritical) {
      score -= 30;
    } else if (this.analysis.totalSize > config.thresholds.totalSizeWarning) {
      score -= 15;
    }

    // Deduct points for chunk issues
    Object.values(this.analysis.chunks).forEach(chunk => {
      if (chunk.status === 'critical') score -= 15;
      else if (chunk.status === 'warning') score -= 5;
    });

    // Deduct points for redundancy
    const redundancyScore = this.analysis.redundancy.reduce((sum, r) => sum + r.potentialSavings, 0);
    const redundancyPercentage = redundancyScore / this.analysis.totalSize;
    score -= Math.round(redundancyPercentage * 20);

    // Deduct points for errors and warnings
    score -= this.analysis.performance.errors.length * 10;
    score -= this.analysis.performance.warnings.length * 5;

    this.analysis.performance.score = Math.max(0, score);
  }

  async generateReports() {
    // JSON report
    fs.writeFileSync(config.outputFile, JSON.stringify(this.analysis, null, 2));
    console.log(`📄 JSON report saved: ${config.outputFile}`);

    // HTML report
    const htmlContent = this.generateHtmlReport();
    fs.writeFileSync(config.htmlReport, htmlContent);
    console.log(`📄 HTML report saved: ${config.htmlReport}`);
  }

  generateHtmlReport() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bundle Analysis Report</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { padding: 20px; }
        .metric { display: inline-block; margin: 10px 20px 10px 0; padding: 15px; background: #f8f9fa; border-radius: 6px; min-width: 150px; }
        .metric-value { font-size: 24px; font-weight: bold; color: #495057; }
        .metric-label { font-size: 12px; color: #6c757d; text-transform: uppercase; }
        .section { margin: 30px 0; }
        .section h3 { color: #495057; border-bottom: 2px solid #e9ecef; padding-bottom: 10px; }
        .chunk { padding: 10px; margin: 10px 0; border-left: 4px solid #28a745; background: #f8f9fa; }
        .chunk.warning { border-left-color: #ffc107; }
        .chunk.critical { border-left-color: #dc3545; }
        .recommendation { padding: 15px; margin: 10px 0; border-radius: 6px; }
        .recommendation.critical { background: #f8d7da; border: 1px solid #f5c6cb; }
        .recommendation.warning { background: #fff3cd; border: 1px solid #ffeaa7; }
        .score { font-size: 48px; font-weight: bold; text-align: center; padding: 20px; }
        .score.good { color: #28a745; }
        .score.warning { color: #ffc107; }
        .score.critical { color: #dc3545; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #dee2e6; }
        th { background: #f8f9fa; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Bundle Analysis Report</h1>
            <p>Generated on ${new Date(this.analysis.timestamp).toLocaleString()}</p>
        </div>
        <div class="content">
            <div class="section">
                <div class="metric">
                    <div class="metric-value">${this.formatSize(this.analysis.totalSize)}</div>
                    <div class="metric-label">Total Size</div>
                </div>
                <div class="metric">
                    <div class="metric-value">${this.formatSize(this.analysis.gzippedSize)}</div>
                    <div class="metric-label">Gzipped Size</div>
                </div>
                <div class="metric">
                    <div class="metric-value">${this.analysis.files.length}</div>
                    <div class="metric-label">Total Files</div>
                </div>
                <div class="metric">
                    <div class="metric-value score ${this.getScoreClass(this.analysis.performance.score)}">${this.analysis.performance.score}/100</div>
                    <div class="metric-label">Performance Score</div>
                </div>
            </div>

            <div class="section">
                <h3>Chunk Analysis</h3>
                ${Object.entries(this.analysis.chunks).map(([name, chunk]) => `
                    <div class="chunk ${chunk.status}">
                        <strong>${name}</strong>: ${this.formatSize(chunk.size)} (${chunk.percentage.toFixed(1)}%) - ${chunk.files} file(s)
                    </div>
                `).join('')}
            </div>

            <div class="section">
                <h3>Recommendations</h3>
                ${this.analysis.recommendations.map(rec => `
                    <div class="recommendation ${rec.type}">
                        <strong>[${rec.category}]</strong> ${rec.message}
                    </div>
                `).join('')}
            </div>

            <div class="section">
                <h3>File Breakdown</h3>
                <table>
                    <thead>
                        <tr>
                            <th>File</th>
                            <th>Type</th>
                            <th>Size</th>
                            <th>Gzipped</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.analysis.files
                          .sort((a, b) => b.size - a.size)
                          .slice(0, 20)
                          .map(file => `
                            <tr>
                                <td>${file.path}</td>
                                <td>${file.type}</td>
                                <td>${this.formatSize(file.size)}</td>
                                <td>${this.formatSize(file.gzippedSize)}</td>
                            </tr>
                          `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>
</html>`;
  }

  formatSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getScoreClass(score) {
    if (score >= 80) return 'good';
    if (score >= 60) return 'warning';
    return 'critical';
  }
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const analyzer = new BundleAnalyzer();

  analyzer.analyze()
    .then(() => {
      console.log('\\n🎉 Analysis complete! Check the generated reports.');
      process.exit(0);
    })
    .catch(error => {
      console.error('\\n💥 Analysis failed:', error.message);
      process.exit(1);
    });
}

export { BundleAnalyzer };