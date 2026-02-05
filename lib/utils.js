const path = require('path');
const fs = require('fs');

function getRootDir() {
  return path.dirname(__dirname);
}

function getRevealPath() {
  return path.join(getRootDir(), 'node_modules', 'reveal.js');
}

function getTemplatePath() {
  return path.join(getRootDir(), 'templates', 'index.html');
}

/**
 * Generates the complete HTML for the presentation.
 * @param {string} mdContent Markdown content
 * @param {string} title Presentation title
 * @param {boolean} enableReload Whether to include the auto-reload script
 * @returns {string} The HTML string
 */
function generateHtml(mdContent, title, enableReload = false) {
  const templatePath = getTemplatePath();
  let template = fs.readFileSync(templatePath, 'utf-8');

  // Inject content and title
  let html = template.replace('{{TITLE}}', title).replace('{{CONTENT}}', mdContent);

  // Handle auto-reload script
  const reloadScript = `
      // Auto-reload script
      if (
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
      ) {
        const ws = new WebSocket("ws://" + window.location.host);
        ws.onmessage = function (event) {
          if (event.data === "reload") {
            window.location.reload();
          }
        };
        ws.onopen = () => console.log("Connected to auto-reload server");
      }
    `;

  if (enableReload) {
    html = html.replace('/* RELOAD_SCRIPT */', reloadScript);
  } else {
    html = html.replace('/* RELOAD_SCRIPT */', '');
  }

  return html;
}

module.exports = {
  getRootDir,
  getRevealPath,
  getTemplatePath,
  generateHtml,
};
