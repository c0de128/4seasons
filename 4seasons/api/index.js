// Vercel serverless function handler for API routes
let app;

export default async function handler(req, res) {
  try {
    // Initialize the app only once
    if (!app) {
      // Import the Vercel-specific app initializer
      const { default: getApp } = await import('../server/dist/vercel.js');
      app = await getApp();
    }

    // Handle the request with the Express app
    return new Promise((resolve, reject) => {
      app(req, res, (err) => {
        if (err) {
          console.error('Express error:', err);
          if (!res.headersSent) {
            res.status(500).json({ error: 'Internal server error' });
          }
          reject(err);
        } else {
          resolve();
        }
      });
    });
  } catch (error) {
    console.error('Failed to initialize server:', error);
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Server initialization failed' });
    }
  }
}