# Contributing to Renovate Playground

We are always looking for quality contributions and will be happy to accept your Pull Requests as long as they adhere to some basic rules.

Renovate Playground is a web-based tool that helps developers test and debug [Renovate](https://github.com/renovatebot/renovate) configurations in real-time without making actual changes to repositories.

The [Open Source Guides](https://opensource.guide/) website has a collection of resources for individuals, communities, and companies. These resources help people who want to learn how to run and contribute to open source projects. Contributors and people new to open source alike will find the following guides especially useful:

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Building Welcoming Communities](https://opensource.guide/building-community/)

## Organization of the Repository

This is an **Nx monorepo** organized with multiple applications:

- [`apps/api`](apps/api) - NestJS backend that spawns and manages Renovate processes
- [`apps/ui`](apps/ui) - Angular 20 frontend with Material Design components

The backend provides:
- RESTful API endpoints for Renovate execution
- Real-time log streaming via Server-Sent Events (SSE)
- Temporary configuration management
- Process lifecycle management

The frontend delivers:
- Interactive configuration editor
- Real-time log viewer
- Results visualization (package files, branches, updates)
- Responsive Material Design UI

## Getting Started

If you want to play with Renovate Playground on your own machine:

1. **Clone the project**
   ```bash
   git clone https://github.com/AmadeusITGroup/renovate-playground.git
   cd renovate-playground
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development servers**
   ```bash
   pnpm start
   ```

4. **Open the application**
   - Navigate to http://localhost:4200 in your browser
   - The API runs on http://localhost:3333

To know more about the different commands you can run locally, please check the sections below.

## Development Commands

Several commands are available to help you develop and test the application. You can run commands for specific applications or all at once.

### Running the Applications

**Start both UI and API concurrently:**
```bash
pnpm start
```

**Or run them separately:**
```bash
# Terminal 1 - Start the API (http://localhost:3333)
pnpm start:api

# Terminal 2 - Start the UI (http://localhost:4200)
pnpm start:ui
```

**Using Nx directly:**
```bash
# Run specific application
nx serve api
nx serve ui

# Run with specific configuration
nx serve api --configuration=development
```

### Building

**Build all applications:**
```bash
pnpm build
```

**Build specific application:**
```bash
nx build api --configuration=production
nx build ui --configuration=production
```

**Build Docker image:**
```bash
docker build -t renovate-playground:latest .
```

### Testing

**Run all tests:**
```bash
pnpm test
```

**Run tests for specific application:**
```bash
nx test api
nx test ui
```

**Run tests in watch mode:**
```bash
nx test api --watch
nx test ui --watch
```

**Run tests with coverage:**
```bash
nx test api --coverage
nx test ui --coverage
```

### Code Quality

**Lint all code:**
```bash
pnpm lint
```

**Lint specific application:**
```bash
nx lint api
nx lint ui
```

**Format code:**
```bash
pnpm format
```

**Check formatting without making changes:**
```bash
prettier --check "**/*.{ts,html,scss,json}"
```

## Development Workflow

### 1. Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/renovate-playground.git
   cd renovate-playground
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/renovate-playground.git
   ```

### 2. Create a Branch

Create a descriptive branch for your changes:

```bash
git checkout -b feature/add-gitlab-support
git checkout -b fix/log-streaming-timeout
git checkout -b docs/update-readme
```

### 3. Make Your Changes

- Write clean, readable code
- Follow existing code patterns and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass

### 4. Commit Your Changes

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): subject

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring without changing functionality
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates
- `perf`: Performance improvements

**Examples:**
```bash
git commit -m "feat(api): add support for GitLab repositories"
git commit -m "fix(ui): resolve SSE connection timeout issue"
git commit -m "docs(readme): add Docker deployment instructions"
git commit -m "test(api): add unit tests for PlaygroundService"
```

### 5. Keep Your Branch Updated

```bash
git fetch upstream
git rebase upstream/main
```

### 6. Run Quality Checks

Before submitting, ensure everything passes:

```bash
pnpm format
pnpm lint
pnpm test
pnpm build
```

### 7. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear, descriptive title
- Detailed description of changes
- Reference to related issues (if any)
- Screenshots for UI changes

## Coding Standards

### TypeScript

- Use TypeScript for all code
- Enable strict type checking
- Avoid `any` types - use proper types or `unknown`
- Use interfaces for object shapes
- Prefer `const` over `let`, avoid `var`

### Angular (Frontend)

- Follow the [Angular Style Guide](https://angular.dev/style-guide)
- Use standalone components (Angular 20+)
- Implement `OnPush` change detection where appropriate
- Use reactive forms over template-driven forms
- Keep components focused and single-purpose
- Use RxJS operators effectively

### NestJS (Backend)

- Follow NestJS best practices
- Use dependency injection
- Implement DTOs for validation
- Use proper error handling with filters
- Document API endpoints with Swagger decorators
- Use guards for authentication/authorization

### General Guidelines

- Write self-documenting code with clear names
- Add comments for complex logic
- Keep functions small and focused
- Avoid deep nesting
- Handle errors gracefully
- Log important events and errors

## Testing Guidelines

- Write tests for new features and bug fixes
- Test edge cases and error scenarios
- Use descriptive test names
- Follow the AAA pattern: Arrange, Act, Assert
- Mock external dependencies

## Pull Request Guidelines

### Before Submitting

- [ ] Code follows the project's style guidelines
- [ ] All tests pass locally
- [ ] Linting passes without errors
- [ ] Code is properly formatted
- [ ] New tests added for new features
- [ ] Documentation updated if needed
- [ ] Commit messages follow conventional commits
- [ ] Branch is up to date with main

### PR Description Template

```markdown
## Description
Brief description of what this PR does and why.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## Related Issues
Fixes #(issue number)
Relates to #(issue number)

## How Has This Been Tested?
Describe the tests you ran and how to reproduce them.

## Screenshots (if applicable)
Add screenshots for UI changes.

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
```

## Questions or Need Help?

If you have questions or need help:

1. **Check existing documentation**: README.md and this CONTRIBUTING.md
2. **Search existing issues**: Someone might have already asked
3. **Create a new issue**: Use the `question` label
4. **Join discussions**: Participate in GitHub Discussions (if enabled)

## Code of Conduct

By participating in this project, you agree to:

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## License

By contributing to Renovate Playground, you agree that your contributions will be licensed under the same license as the project.

---

**Thank you for contributing to Renovate Playground!** 🎉
