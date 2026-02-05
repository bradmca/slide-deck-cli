#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const { startServer } = require('../lib/server');
const { exportPdf } = require('../lib/pdf');
const { build } = require('../lib/build');
const fs = require('fs');

const packageJson = require('../package.json');

program
  .version(packageJson.version)
  .argument('<file>', 'Markdown file to convert')
  .option('--port <number>', 'Port to run server on', '3000')
  .option('--pdf', 'Export to PDF')
  .option('--build', 'Build static HTML site')
  .option('--no-open', 'Do not open browser')
  .action(async (file, options) => {
    const mdPath = path.resolve(process.cwd(), file);

    if (!fs.existsSync(mdPath)) {
      console.error(`Error: File not found: ${mdPath}`);
      process.exit(1);
    }

    if (options.pdf) {
      const outputPath = mdPath.replace(/\.md$/i, '.pdf');
      await exportPdf(mdPath, outputPath);
      process.exit(0);
    } else if (options.build) {
      build(mdPath);
      process.exit(0);
    } else {
      startServer(mdPath, parseInt(options.port), options.open);
    }
  });

program.parse(process.argv);
