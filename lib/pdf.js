const puppeteer = require('puppeteer');
const { startServer } = require('./server');

async function exportPdf(mdPath, outputPath) {
  // Find a free port or just use a distinct one for export
  const port = 3001;

  // Start server without opening browser
  console.log('Starting server for PDF generation...');
  const server = startServer(mdPath, port, false);

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // ?print-pdf is the Reveal.js trigger for print stylesheet
    const url = `http://localhost:${port}/?print-pdf`;
    console.log(`Loading ${url} in headless browser...`);

    await page.goto(url, { waitUntil: 'networkidle0' });

    // Ensure Reveal is ready?
    // networkidle0 is usually enough for local, but specific element check is safer.

    // Define PDF dimensions to match slides if possible, or standard landscape A4
    // Reveal.js slides are usually 960x700 by default.
    // 960x700 @ 96dpi is roughly 10in x 7.3in.

    console.log(`Writing PDF to ${outputPath}...`);
    await page.pdf({
      path: outputPath,
      width: '960px',
      height: '700px', // Match Reveal.js config width/height
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    await browser.close();
    console.log('PDF exported successfully!');
  } catch (err) {
    console.error('Error executing PDF generation:', err);
  } finally {
    server.close();
  }
}

module.exports = { exportPdf };
