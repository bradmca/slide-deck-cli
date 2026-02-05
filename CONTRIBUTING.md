# Contributing to Slide-Deck-CLI

First off, thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to Slide-Deck-CLI. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (Markdown files, expected vs actual output)
- **Include your environment details** (Node.js version, OS, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Install dependencies**: `npm install`
3. **Make your changes** and ensure they follow our code style
4. **Run linting**: `npm run lint`
5. **Run tests**: `npm test`
6. **Format code**: `npm run format`
7. **Commit your changes** with a clear commit message
8. **Push to your fork** and submit a pull request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/slide-deck-cli.git
cd slide-deck-cli

# Install dependencies
npm install

# Run the CLI locally
node bin/index.js sample.md

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## Style Guide

- We use **ESLint** and **Prettier** for code formatting
- Run `npm run format` before committing
- Use meaningful variable and function names
- Add comments for complex logic

## Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Keep the first line under 72 characters

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
