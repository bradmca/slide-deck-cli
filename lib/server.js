const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const open = require('open');

const { generateHtml, getRevealPath } = require('./utils');

/**
 * Starts the presentation server.
 * @param {string} mdPath Absolute path to the markdown file.
 * @param {number} port Port to run on.
 * @param {boolean} shouldOpen Whether to open the browser automatically.
 */
function startServer(mdPath, port = 3000, shouldOpen = true) {
  const app = express();
  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server });

  const revealPath = getRevealPath();

  // Serve Reveal.js assets
  app.use('/_assets', express.static(revealPath));

  // Serve user images/assets relative to the markdown file
  const mdDir = path.dirname(mdPath);
  app.use(express.static(mdDir));

  // Serve the main page
  app.get('/', (req, res) => {
    try {
      const content = fs.readFileSync(mdPath, 'utf-8');

      // Simple title extraction
      const titleMatch = content.match(/^#\s+(.*)/);
      const title = titleMatch ? titleMatch[1] : path.basename(mdPath);

      const html = generateHtml(content, title, true);

      res.send(html);
    } catch (error) {
      res.status(500).send(`Error loading presentation: ${error.message}`);
    }
  });

  // Watch for file changes
  const watcher = chokidar.watch(mdPath);
  watcher.on('change', () => {
    console.log(`File ${path.basename(mdPath)} changed. Reloading...`);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send('reload');
      }
    });
  });

  server.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`Presentation running at ${url}`);
    if (shouldOpen) {
      open(url);
    }
  });

  return server;
}

module.exports = { startServer };
