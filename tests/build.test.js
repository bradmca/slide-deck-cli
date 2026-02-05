const { build } = require('../lib/build');
const fs = require('fs');
const path = require('path');

describe('Build', () => {
  const testMdPath = path.join(__dirname, '..', 'sample.md');
  const distPath = path.join(__dirname, '..', 'dist');

  beforeAll(() => {
    // Clean up dist folder before tests
    if (fs.existsSync(distPath)) {
      fs.rmSync(distPath, { recursive: true });
    }
  });

  afterAll(() => {
    // Clean up after tests
    if (fs.existsSync(distPath)) {
      fs.rmSync(distPath, { recursive: true });
    }
  });

  it('should create dist directory', () => {
    build(testMdPath);
    expect(fs.existsSync(distPath)).toBe(true);
  });

  it('should generate index.html', () => {
    build(testMdPath);
    const indexPath = path.join(distPath, 'index.html');
    expect(fs.existsSync(indexPath)).toBe(true);
  });

  it('should copy reveal.js assets', () => {
    build(testMdPath);
    const assetsPath = path.join(distPath, '_assets');
    expect(fs.existsSync(assetsPath)).toBe(true);
    expect(fs.existsSync(path.join(assetsPath, 'dist', 'reveal.js'))).toBe(true);
  });

  it('should not include reload script in built HTML', () => {
    build(testMdPath);
    const indexPath = path.join(distPath, 'index.html');
    const html = fs.readFileSync(indexPath, 'utf-8');
    expect(html).not.toContain('Auto-reload script');
  });
});
