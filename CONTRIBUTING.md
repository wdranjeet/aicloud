# Contributing to AICloud

Thank you for your interest in contributing to AICloud! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and constructive in all interactions with the community.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/aicloud.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes thoroughly
6. Commit your changes: `git commit -m "Add feature: description"`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Create a Pull Request

## Development Setup

1. Install dependencies:
```bash
npm install
cd frontend && npm install
```

2. Set up environment:
```bash
cp .env.example .env
```

3. Start development servers:
```bash
# Terminal 1: Backend
npm run dev

# Terminal 2: Frontend
cd frontend && npm start
```

## Code Style

- Follow the existing code style
- Use ESLint for JavaScript linting
- Write meaningful commit messages
- Add comments for complex logic
- Keep functions small and focused

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Run tests: `npm test`

## Pull Request Guidelines

1. **Title**: Use a clear, descriptive title
2. **Description**: Explain what changes you made and why
3. **Testing**: Describe how you tested the changes
4. **Screenshots**: Include screenshots for UI changes
5. **Breaking Changes**: Clearly mark any breaking changes

## Areas to Contribute

### Backend
- API endpoints
- Authentication & security
- Database integration
- Build pipeline improvements
- Performance optimization

### Frontend
- UI/UX improvements
- New dashboard features
- Mobile responsiveness
- Accessibility improvements

### CLI
- New commands
- Better error handling
- Interactive features
- Documentation

### Documentation
- API documentation
- User guides
- Code examples
- Video tutorials

### Infrastructure
- Docker improvements
- CI/CD enhancements
- Deployment scripts
- Monitoring & logging

## Reporting Bugs

Use GitHub Issues to report bugs. Include:

1. Clear description of the bug
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Environment details (OS, Node version, etc.)
6. Screenshots if applicable

## Feature Requests

We welcome feature requests! Please:

1. Check existing issues first
2. Provide clear use case
3. Explain expected behavior
4. Consider providing a PR

## Questions?

- Open an issue with the "question" label
- Join our Discord community (coming soon)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
