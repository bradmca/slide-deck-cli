const { generateHtml, getRevealPath, getTemplatePath, getRootDir } = require('../lib/utils');
const fs = require('fs');
const path = require('path');

describe('Utils', () => {
  describe('getRootDir', () => {
    it('should return the project root directory', () => {
      const rootDir = getRootDir();
      expect(rootDir).toContain('slide-deck-cli');
      expect(fs.existsSync(path.join(rootDir, 'package.json'))).toBe(true);
    });
  });

  describe('getRevealPath', () => {
    it('should return path to reveal.js in node_modules', () => {
      const revealPath = getRevealPath();
      expect(revealPath).toContain('reveal.js');
      expect(fs.existsSync(revealPath)).toBe(true);
    });
  });

  describe('getTemplatePath', () => {
    it('should return path to template file', () => {
      const templatePath = getTemplatePath();
      expect(templatePath).toContain('index.html');
      expect(fs.existsSync(templatePath)).toBe(true);
    });
  });

  describe('generateHtml', () => {
    const sampleContent = '# Test Slide\n\nHello World';
    const sampleTitle = 'Test Presentation';

    it('should generate HTML with title and content', () => {
      const html = generateHtml(sampleContent, sampleTitle, false);
      expect(html).toContain('<title>Test Presentation</title>');
      expect(html).toContain('# Test Slide');
      expect(html).toContain('Hello World');
    });

    it('should include reload script when enabled', () => {
      const html = generateHtml(sampleContent, sampleTitle, true);
      expect(html).toContain('Auto-reload script');
      expect(html).toContain('WebSocket');
    });

    it('should not include reload script when disabled', () => {
      const html = generateHtml(sampleContent, sampleTitle, false);
      expect(html).not.toContain('Auto-reload script');
      expect(html).not.toContain('WebSocket');
    });

    it('should include Reveal.js initialization', () => {
      const html = generateHtml(sampleContent, sampleTitle, false);
      expect(html).toContain('Reveal.initialize');
      expect(html).toContain('RevealMarkdown');
      expect(html).toContain('RevealHighlight');
    });
  });
});
