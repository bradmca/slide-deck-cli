const fs = require('fs');
const path = require('path');
const { generateHtml, getRevealPath } = require('./utils');

/**
 * Builds the static presentation.
 * @param {string} mdPath Path to markdown file
 * @param {object} options Build options
 */
function build(mdPath, _options = {}) {
  // Use 'dist' relative to the markdown file, not CWD, unless specified differently.
  // Usually build artifacts go next to source.
  const outputDir = path.resolve(process.cwd(), 'dist');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Building to ${outputDir}...`);

  // 1. Generate HTML
  const content = fs.readFileSync(mdPath, 'utf-8');
  const titleMatch = content.match(/^#\s+(.*)/);
  const title = titleMatch ? titleMatch[1] : path.basename(mdPath);

  // Pass false for enableReload so no WS script is injected
  const html = generateHtml(content, title, false);

  fs.writeFileSync(path.join(outputDir, 'index.html'), html);
  console.log('Generated index.html');

  // 2. Copy Reveal.js assets
  const revealSrc = getRevealPath();
  const assetsDest = path.join(outputDir, '_assets');

  // Using fs.cpSync (Node 16.7+)
  fs.cpSync(revealSrc, assetsDest, { recursive: true });
  console.log('Copied Reveal.js assets');

  // 3. (Optional) Copy other static assets from the markdown directory?
  // Doing a blanket copy is risky.
  // Let's just create the folder and tell the user.
  console.log(
    'Build complete. Note: Local images referenced in Markdown must be copied to the dist folder manually for now.'
  );
}

module.exports = { build };
