import { Router } from "express";
import { logger } from "../logger";

const router = Router();

// MIME type mapping for MLS resources
const MIME_TYPES: Record<string, string> = {
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.ashx': 'application/javascript', // ASP.NET handlers that return JS
  '.axd': 'application/javascript'   // ASP.NET resource handlers
};

function getMimeType(path: string, upstreamContentType?: string): string {
  // Priority 1: Use valid upstream Content-Type if available
  if (upstreamContentType) {
    const mainType = upstreamContentType.split(';')[0].trim().toLowerCase();
    // Validate that it's a reasonable MIME type (not HTML error pages)
    if (mainType && !mainType.includes('text/html') && mainType.includes('/')) {
      return upstreamContentType;
    }
  }

  // Priority 2: Path pattern matching for ASP.NET routes without extensions
  const lowerPath = path.toLowerCase();
  if (lowerPath.includes('/css/') || lowerPath.endsWith('/css') || lowerPath.includes('/styles/')) {
    return 'text/css';
  }
  if (lowerPath.includes('/js/') || lowerPath.includes('/scripts/') || lowerPath.includes('/javascript/')) {
    return 'application/javascript';
  }
  if (lowerPath.includes('/fonts/') || lowerPath.includes('/font/')) {
    return 'font/woff2'; // Default font type
  }
  if (lowerPath.includes('/images/') || lowerPath.includes('/img/')) {
    return 'image/png'; // Default image type
  }

  // Priority 3: File extension detection
  const ext = path.toLowerCase().substring(path.lastIndexOf('.'));
  if (ext && MIME_TYPES[ext]) {
    return MIME_TYPES[ext];
  }

  // Priority 4: ASP.NET specific handlers
  if (lowerPath.includes('.axd') || lowerPath.includes('.ashx')) {
    return 'application/javascript'; // Most ASP.NET handlers serve JS
  }

  // Fallback
  return 'text/html';
}

// MLS Proxy endpoint to bypass CORS and iframe restrictions
router.get("/proxy", async (req, res) => {
  try {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    // Only allow NTREIS URLs for security
    const allowedHosts = [
      'matrix.ntreis.net',
      'www.ntreis.net',
      'ntreis.net'
    ];

    const urlObj = new URL(url);
    if (!allowedHosts.includes(urlObj.hostname)) {
      logger.warn('MLS proxy blocked unauthorized domain', {
        requestedUrl: url,
        hostname: urlObj.hostname,
        clientIp: req.ip
      });
      return res.status(403).json({ error: 'Unauthorized domain' });
    }

    logger.info('MLS proxy request initiated', {
      targetUrl: url,
      clientIp: req.ip,
      userAgent: req.get('User-Agent')
    });

    // Make the request with browser-like headers but from server
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'cross-site',
        'Cache-Control': 'max-age=0'
      },
      // Create manual timeout controller for better compatibility
      signal: (() => {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 15000);
        return controller.signal;
      })()
    });

    logger.info('MLS proxy response received', {
      status: response.status,
      statusText: response.statusText,
      contentType: response.headers.get('content-type'),
      targetUrl: url
    });

    if (!response.ok) {
      logger.warn('MLS proxy request failed', {
        status: response.status,
        statusText: response.statusText,
        targetUrl: url
      });
      return res.status(response.status).json({
        error: `Upstream server returned ${response.status}: ${response.statusText}`
      });
    }

    // Get the response content
    let content = await response.text();
    const contentType = response.headers.get('content-type') || 'text/html';

    // If this is the main HTML page, rewrite resource URLs to use our proxy
    if (contentType.includes('text/html')) {
      // Comprehensive URL rewriting for all Matrix resources
      content = content
        // Rewrite src attributes (double quotes)
        .replace(/src="(\/Matrix\/[^"]+)"/g, 'src="/api/mls$1"')
        // Rewrite src attributes (single quotes)
        .replace(/src='(\/Matrix\/[^']+)'/g, 'src="/api/mls$1"')
        // Rewrite href attributes (double quotes)
        .replace(/href="(\/Matrix\/[^"]+)"/g, 'href="/api/mls$1"')
        // Rewrite href attributes (single quotes)
        .replace(/href='(\/Matrix\/[^']+)'/g, 'href="/api/mls$1"')
        // Rewrite action attributes for forms (double quotes)
        .replace(/action="(\/Matrix\/[^"]+)"/g, 'action="/api/mls$1"')
        // Rewrite action attributes for forms (single quotes)
        .replace(/action='(\/Matrix\/[^']+)'/g, 'action="/api/mls$1"')
        // Rewrite URL() references in CSS/JavaScript
        .replace(/url\("(\/Matrix\/[^"]+)"\)/g, 'url("/api/mls$1")')
        .replace(/url\('(\/Matrix\/[^']+)'\)/g, 'url("/api/mls$1")')
        .replace(/url\((\/Matrix\/[^)]+)\)/g, 'url(/api/mls$1)')
        // Rewrite JavaScript string references (double quotes)
        .replace(/"(\/Matrix\/[^"]+)"/g, '"/api/mls$1"')
        // Rewrite JavaScript string references (single quotes)
        .replace(/'(\/Matrix\/[^']+)'/g, '"/api/mls$1"')
        // Handle relative Matrix paths without leading slash
        .replace(/src="(Matrix\/[^"]+)"/g, 'src="/api/mls/$1"')
        .replace(/href="(Matrix\/[^"]+)"/g, 'href="/api/mls/$1"')
        // Handle any remaining Matrix references in JavaScript
        .replace(/(['"])(Matrix\/[^'"]*)\1/g, '$1/api/mls/$2$1');

      // Inject height detection and auto-resize script
      const heightDetectionScript = `
      <script>
        (function() {
          'use strict';

          // Configuration
          const config = {
            debounceDelay: 150,
            maxHeight: 5000,
            minHeight: 600,
            targetOrigins: ['http://localhost:5000', 'https://4seasonsrealestate.com'],
            debug: false
          };

          // Utility functions
          function log(...args) {
            if (config.debug) {
              console.log('[MLS Height Detector]', ...args);
            }
          }

          function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
              const later = () => {
                clearTimeout(timeout);
                func(...args);
              };
              clearTimeout(timeout);
              timeout = setTimeout(later, wait);
            };
          }

          function getContentHeight() {
            try {
              // Try multiple methods to get the most accurate height
              const heights = [
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight,
                document.documentElement.clientHeight
              ];

              // Add heights of all major content containers
              const containers = document.querySelectorAll('div, main, section, article, .content, #content, .main, #main');
              containers.forEach(container => {
                if (container.offsetHeight > 0) {
                  heights.push(container.offsetHeight + (container.offsetTop || 0));
                }
              });

              // Get the maximum reliable height
              const maxHeight = Math.max(...heights.filter(h => h > 0 && h < config.maxHeight));
              const finalHeight = Math.max(Math.min(maxHeight, config.maxHeight), config.minHeight);

              log('Height calculation:', { heights, maxHeight, finalHeight });
              return finalHeight;
            } catch (error) {
              log('Error calculating height:', error);
              return config.minHeight;
            }
          }

          function sendHeightMessage() {
            try {
              const height = getContentHeight();
              const width = Math.max(
                document.body.scrollWidth,
                document.body.offsetWidth,
                document.documentElement.scrollWidth,
                document.documentElement.offsetWidth
              );

              const message = {
                type: 'mls-iframe-resize',
                height: height,
                width: width,
                timestamp: Date.now(),
                url: window.location.href
              };

              log('Sending resize message:', message);

              // Send to all configured target origins
              config.targetOrigins.forEach(origin => {
                try {
                  if (window.parent && window.parent !== window) {
                    window.parent.postMessage(message, origin);
                  }
                  if (window.top && window.top !== window) {
                    window.top.postMessage(message, origin);
                  }
                } catch (e) {
                  log('Failed to send message to origin:', origin, e);
                }
              });

              // Also try sending without specific origin (for development)
              try {
                if (window.parent && window.parent !== window) {
                  window.parent.postMessage(message, '*');
                }
              } catch (e) {
                log('Failed to send message with wildcard origin:', e);
              }

            } catch (error) {
              log('Error sending height message:', error);
            }
          }

          // Debounced resize function
          const debouncedSendHeight = debounce(sendHeightMessage, config.debounceDelay);

          // Initialize height detection
          function initializeHeightDetection() {
            log('Initializing height detection...');

            // Send initial height
            setTimeout(sendHeightMessage, 100);

            // Set up ResizeObserver for modern browsers
            if (window.ResizeObserver) {
              try {
                const resizeObserver = new ResizeObserver(entries => {
                  log('ResizeObserver triggered');
                  debouncedSendHeight();
                });

                // Observe the body and document element
                resizeObserver.observe(document.body);
                if (document.documentElement) {
                  resizeObserver.observe(document.documentElement);
                }

                // Observe main content containers
                const contentSelectors = [
                  '.content', '#content', '.main', '#main',
                  '.container', '#container', '.wrapper', '#wrapper',
                  'main', 'article', 'section[class*="content"]'
                ];

                contentSelectors.forEach(selector => {
                  const elements = document.querySelectorAll(selector);
                  elements.forEach(el => {
                    try {
                      resizeObserver.observe(el);
                    } catch (e) {
                      log('Could not observe element:', selector, e);
                    }
                  });
                });

                log('ResizeObserver set up successfully');
              } catch (error) {
                log('ResizeObserver setup failed:', error);
              }
            }

            // Set up MutationObserver for DOM changes
            if (window.MutationObserver) {
              try {
                const mutationObserver = new MutationObserver(mutations => {
                  let shouldResize = false;
                  mutations.forEach(mutation => {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                      shouldResize = true;
                    }
                    if (mutation.type === 'attributes' &&
                        ['style', 'class', 'height', 'width'].includes(mutation.attributeName)) {
                      shouldResize = true;
                    }
                  });

                  if (shouldResize) {
                    log('MutationObserver triggered');
                    debouncedSendHeight();
                  }
                });

                mutationObserver.observe(document.body, {
                  childList: true,
                  subtree: true,
                  attributes: true,
                  attributeFilter: ['style', 'class', 'height', 'width']
                });

                log('MutationObserver set up successfully');
              } catch (error) {
                log('MutationObserver setup failed:', error);
              }
            }

            // Fallback: Regular interval checks
            setInterval(() => {
              sendHeightMessage();
            }, 2000);

            // Listen for window resize
            window.addEventListener('resize', debouncedSendHeight);

            // Listen for load events
            window.addEventListener('load', () => {
              setTimeout(sendHeightMessage, 500);
            });

            // Listen for DOMContentLoaded
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', () => {
                setTimeout(sendHeightMessage, 300);
              });
            }

            log('Height detection initialized');
          }

          // Start when DOM is ready
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeHeightDetection);
          } else {
            initializeHeightDetection();
          }

          // Also start on window load as backup
          window.addEventListener('load', initializeHeightDetection);

        })();
      </script>`;

      // Inject the script before the closing body tag, or at the end if no body tag
      if (content.includes('</body>')) {
        content = content.replace('</body>', heightDetectionScript + '</body>');
      } else if (content.includes('</html>')) {
        content = content.replace('</html>', heightDetectionScript + '</html>');
      } else {
        content += heightDetectionScript;
      }
    }

    // Set appropriate headers for the response
    res.setHeader('Content-Type', contentType);
    res.setHeader('X-Frame-Options', 'ALLOWALL'); // Allow framing from our domain
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    // Send the proxied content
    res.send(content);

  } catch (error: any) {
    logger.error('MLS proxy error', {
      error: error.message,
      stack: error.stack,
      targetUrl: req.query.url
    });

    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      return res.status(502).json({ error: 'Unable to connect to MLS server' });
    }

    if (error.name === 'AbortError' || error.code === 'ETIMEDOUT') {
      return res.status(504).json({ error: 'Request timeout' });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
});

// Enhanced MLS proxy with request modification
router.get("/proxy-enhanced", async (req, res) => {
  try {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    const urlObj = new URL(url);
    const allowedHosts = ['matrix.ntreis.net', 'www.ntreis.net', 'ntreis.net'];

    if (!allowedHosts.includes(urlObj.hostname)) {
      return res.status(403).json({ error: 'Unauthorized domain' });
    }

    // Try different user agents and referrer policies
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    ];

    const referrers = [
      'https://www.ntreis.net/',
      'https://matrix.ntreis.net/',
      undefined // No referrer
    ];

    for (let i = 0; i < userAgents.length; i++) {
      for (let j = 0; j < referrers.length; j++) {
        try {
          logger.info(`MLS proxy attempt ${i * referrers.length + j + 1}`, {
            userAgent: userAgents[i],
            referrer: referrers[j],
            targetUrl: url
          });

          const headers: Record<string, string> = {
            'User-Agent': userAgents[i],
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'cross-site'
          };

          if (referrers[j]) {
            headers['Referer'] = referrers[j];
          }

          const response = await fetch(url, {
            method: 'GET',
            headers,
            signal: (() => {
              const controller = new AbortController();
              setTimeout(() => controller.abort(), 10000);
              return controller.signal;
            })()
          });

          if (response.ok) {
            const content = await response.text();
            const contentType = response.headers.get('content-type') || 'text/html';

            logger.info('MLS proxy success', {
              attempt: i * referrers.length + j + 1,
              status: response.status,
              userAgent: userAgents[i],
              referrer: referrers[j]
            });

            res.setHeader('Content-Type', contentType);
            res.setHeader('X-Frame-Options', 'ALLOWALL');
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

            return res.send(content);
          }

          logger.warn(`MLS proxy attempt ${i * referrers.length + j + 1} failed`, {
            status: response.status,
            statusText: response.statusText
          });

        } catch (attemptError: any) {
          logger.warn(`MLS proxy attempt ${i * referrers.length + j + 1} error`, {
            error: attemptError.message
          });
        }
      }
    }

    // If all attempts failed
    logger.error('All MLS proxy attempts failed', { targetUrl: url });
    res.status(502).json({ error: 'All proxy attempts failed' });

  } catch (error: any) {
    logger.error('MLS enhanced proxy error', {
      error: error.message,
      stack: error.stack
    });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Catch-all route for MLS resources (JS, CSS, images, etc.)
router.get("/Matrix/*", async (req, res) => {
  try {
    const resourcePath = req.path; // e.g., "/Matrix/Scripts/jquery.min.js"
    const queryString = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
    const targetUrl = `https://matrix.ntreis.net${resourcePath}${queryString}`;

    logger.info('MLS resource proxy request', {
      resourcePath,
      targetUrl,
      clientIp: req.ip,
      userAgent: req.get('User-Agent')
    });

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Referer': 'https://matrix.ntreis.net/',
        'Sec-Fetch-Dest': req.path.includes('.js') ? 'script' : req.path.includes('.css') ? 'style' : 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin'
      },
      signal: (() => {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 15000);
        return controller.signal;
      })()
    });

    logger.info('MLS resource response received', {
      status: response.status,
      statusText: response.statusText,
      contentType: response.headers.get('content-type'),
      resourcePath
    });

    if (!response.ok) {
      logger.warn('MLS resource request failed', {
        status: response.status,
        statusText: response.statusText,
        resourcePath
      });
      return res.status(response.status).json({
        error: `Upstream server returned ${response.status}: ${response.statusText}`
      });
    }

    // Determine the correct MIME type using upstream Content-Type and path analysis
    const upstreamContentType = response.headers.get('content-type') || undefined;
    const correctMimeType = getMimeType(resourcePath, upstreamContentType);

    // Get content as buffer for binary files or text for text files
    const isBinary = correctMimeType.startsWith('image/') || correctMimeType.startsWith('font/');
    const content = isBinary ? await response.arrayBuffer() : await response.text();

    // Set appropriate headers
    res.setHeader('Content-Type', correctMimeType);
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Send the content
    if (isBinary) {
      res.send(Buffer.from(content as ArrayBuffer));
    } else {
      res.send(content as string);
    }

  } catch (error: any) {
    logger.error('MLS resource proxy error', {
      error: error.message,
      stack: error.stack,
      resourcePath: req.path
    });

    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      return res.status(502).json({ error: 'Unable to connect to MLS server' });
    }

    if (error.name === 'AbortError' || error.code === 'ETIMEDOUT') {
      return res.status(504).json({ error: 'Request timeout' });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;