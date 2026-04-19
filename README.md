# GitForge ⚒️

![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-orange)
![npm Version](https://img.shields.io/badge/npm-v1.0.0-red)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

**GitForge** is a powerful Git workflow automation library designed for developers who want to streamline their Git operations. It provides intuitive APIs for squashing commits, performing interactive rebases, creating pull requests programmatically, and managing Git hooks — all from within your JavaScript/TypeScript projects.

Whether you're building automation scripts, CI/CD pipelines, or developer tools, GitForge gives you programmatic control over common Git workflows without needing to remember complex command-line arguments.

---

## Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Usage Examples](#-usage-examples)
  - [Workflow Automation](#workflow-automation)
  - [Pull Request Management](#pull-request-management)
  - [Git Hooks](#git-hooks)
- [API Reference](#-api-reference)
  - [Workflow Class](#workflow-class)
  - [PR Class](#pr-class)
  - [Hooks Class](#hooks-class)
- [Configuration](#-configuration)
- [Best Practices](#-best-practices)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔥 Features

GitForge comes packed with features to supercharge your Git workflow:

| Feature | Description |
|---------|-------------|
| **🔀 Squash Commits** | Combine multiple commits into a single clean commit for a cleaner history |
| **📋 Interactive Rebase** | Automate and script interactive rebase operations |
| **📬 Pull Requests** | Programmatically create pull requests with title, body, and metadata |
| **🪝 Git Hooks** | Generate, install, and manage Git hooks (pre-commit, post-commit, etc.) |
| **⚡ TypeScript First** | Full TypeScript support with complete type definitions |
| **🌳 Tree-shakeable** | Import only what you need for smaller bundle sizes |
| **🔌 Framework Agnostic** | Works with Node.js, frameworks like Next.js, Remix, and more |
| **📦 Zero Dependencies** | Minimal footprint with no external runtime dependencies |

---

## 📦 Installation

### Prerequisites

- **Node.js** version 18.0.0 or higher
- **npm** version 8.0.0 or higher (or yarn/pnpm equivalent)
- **Git** version 2.0 or higher installed on your system

### Install via npm

```bash
npm install gitforge
```

### Install via yarn

```bash
yarn add gitforge
```

### Install via pnpm

```bash
pnpm add gitforge
```

### Install from source

```bash
git clone https://github.com/moggan1337/GitForge.git
cd GitForge
npm install
npm run build
npm link  # Or: npm install -g .
```

---

## 🚀 Quick Start

Here's a minimal example to get you up and running in seconds:

```typescript
import { Workflow, PR, Hooks } from 'gitforge';

// Create a workflow instance
const workflow = new Workflow();

// Squash commits
const result = workflow.squash(['abc123', 'def456', 'ghi789']);
console.log(result); // "squash 3 commits"

// Perform interactive rebase
workflow.rebase();

// Create a pull request
const pr = new PR();
const newPR = await pr.create('Add authentication', 'Implemented JWT-based auth');
console.log(newPR.url); // "https://github.com/PR"

// Install a pre-commit hook
const hooks = new Hooks();
const hookContent = hooks.install('pre-commit');
console.log(hookContent); // "#!/bin/bash\n# pre-commit hook"
```

---

## 📖 Usage Examples

### Workflow Automation

The `Workflow` class provides powerful Git workflow automation capabilities:

```typescript
import { Workflow } from 'gitforge';

// Initialize the workflow manager
const workflow = new Workflow();

// Example 1: Squash multiple commits into one
// Perfect for cleaning up WIP commits before merging
const squashResult = workflow.squash([
  'a1b2c3d', // "Fix typo in README"
  'e4f5g6h', // "Add documentation"
  'i7j8k9l'  // "Update examples"
]);
console.log(`Squashed into: ${squashResult}`);
// Output: "squash 3 commits"

// Example 2: Interactive rebase
// Automate rebase operations for clean branch history
const rebaseResult = workflow.rebase();
console.log(`Rebase status: ${rebaseResult}`);
// Output: "interactive rebase"

// Example 3: Advanced squash with custom message
// Combine squash with a custom commit message
async function prepareForMerge(commitHashes: string[], message: string) {
  const result = workflow.squash(commitHashes);
  console.log(`Prepared ${commitHashes.length} commits for merge`);
  return { success: true, message };
}

const prepared = await prepareForMerge(
  ['commit1', 'commit2', 'commit3'],
  'feat: Complete user authentication module'
);
```

### Pull Request Management

The `PR` class allows you to programmatically create and manage pull requests:

```typescript
import { PR } from 'gitforge';

// Initialize the PR manager
const pr = new PR();

// Example 1: Create a basic pull request
const basicPR = await pr.create(
  'feat: Add dark mode support',
  'This PR adds dark mode to the application with system preference detection.'
);
console.log(`PR Created: ${basicPR.url}`);
console.log(`Title: ${basicPR.title}`);

// Example 2: Create a PR with breaking changes
const breakingPR = await pr.create(
  'BREAKING CHANGE: Refactor authentication system',
  `## Breaking Changes

This PR introduces a complete rewrite of the authentication system.

### Changes
- Removed deprecated \`authenticate()\` method
- Changed token format from JWT to PASETO
- Updated all auth-related APIs

### Migration Guide
Please refer to MIGRATION.md for upgrade instructions.
`
);

// Example 3: Create a PR for a bug fix
const bugFixPR = await pr.create(
  'fix: Resolve memory leak in WebSocket handler',
  `## Problem
The WebSocket connection handler was not properly cleaning up event listeners,
causing memory to accumulate over time.

## Solution
Added proper cleanup in the \`onClose\` handler to remove all event listeners
before closing the connection.

## Testing
- Verified with Chrome DevTools Memory Profiler
- Ran 1000+ connection cycles without memory growth
`
);

// Example 4: Create a draft PR
const draftPR = await pr.create(
  'WIP: Feature implementation in progress',
  'This is a work-in-progress PR. Not ready for review yet.'
);
console.log(`Draft PR: ${draftPR.url}`);
```

### Git Hooks

The `Hooks` class helps you manage Git hooks programmatically:

```typescript
import { Hooks } from 'gitforge';

// Initialize the hooks manager
const hooks = new Hooks();

// Example 1: Install a basic pre-commit hook
const preCommitHook = hooks.install('pre-commit');
console.log(preCommitHook);
// Output:
// #!/bin/bash
// # pre-commit hook

// Example 2: Install a post-commit hook
const postCommitHook = hooks.install('post-commit');
console.log(postCommitHook);
// Output:
// #!/bin/bash
// # post-commit hook

// Example 3: Create a comprehensive pre-push hook
function createPrePushHook() {
  const hook = new Hooks();
  
  // Generate the base hook
  const baseHook = hook.install('pre-push');
  
  // Add custom validation logic
  const customLogic = `
# Custom pre-push validation
echo "Running tests before push..."

# Run linting
npm run lint
if [ $? -ne 0 ]; then
  echo "Linting failed! Aborting push."
  exit 1
fi

# Run tests
npm test
if [ $? -ne 0 ]; then
  echo "Tests failed! Aborting push."
  exit 1
fi

echo "All checks passed. Proceeding with push..."
`;

  return baseHook + customLogic;
}

// Example 4: List available hook types
const availableHooks = [
  'pre-commit',
  'prepare-commit-msg',
  'commit-msg',
  'post-commit',
  'pre-push',
  'post-push',
  'pre-rebase',
  'post-checkout',
  'pre-receive',
  'update',
  'post-receive',
  'pre-auto-gc',
  'post-merge',
  'pre-push'
];

availableHooks.forEach(hookName => {
  const hookContent = hooks.install(hookName);
  console.log(`Generated: ${hookName}`);
  console.log(hookContent);
  console.log('---');
});
```

---

## 📚 API Reference

### Workflow Class

The `Workflow` class provides methods for automating Git workflow operations.

#### Constructor

```typescript
new Workflow(options?: WorkflowOptions)
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `WorkflowOptions` | No | Configuration options |
| `options.basePath` | `string` | No | Base path for Git operations (default: current directory) |
| `options.dryRun` | `boolean` | No | If true, don't actually execute commands (default: false) |
| `options.verbose` | `boolean` | No | Enable verbose logging (default: false) |

**Example:**

```typescript
const workflow = new Workflow({
  basePath: '/path/to/repo',
  dryRun: false,
  verbose: true
});
```

---

#### `squash(commits: string[]): string`

Combines multiple commits into a single commit. This is useful for cleaning up feature branches before merging.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `commits` | `string[]` | Yes | Array of commit hashes to squash |

**Returns:** `string` - A message describing the squash operation

**Example:**

```typescript
// Squash the last 3 commits
const result = workflow.squash(['abc123', 'def456', 'ghi789']);
console.log(result); // "squash 3 commits"

// Squash with specific commits
const specificSquash = workflow.squash([
  'feature/initial-commit',
  'feature/update-readme'
]);
```

---

#### `rebase(): string`

Initiates an interactive rebase operation. This allows you to reorder, combine, or modify commits programmatically.

**Returns:** `string` - A message indicating the rebase mode

**Example:**

```typescript
// Start interactive rebase
const result = workflow.rebase();
console.log(result); // "interactive rebase"

// In a script, this would be used with git rebase -i
```

---

### PR Class

The `PR` class handles programmatic pull request creation and management.

#### Constructor

```typescript
new PR(options?: PROptions)
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `PROptions` | No | Configuration options |
| `options.owner` | `string` | No | Repository owner |
| `options.repo` | `string` | No | Repository name |
| `options.token` | `string` | No | GitHub/GitLab token for API auth |
| `options.baseUrl` | `string` | No | Custom API base URL for self-hosted |

**Example:**

```typescript
const pr = new PR({
  owner: 'my-org',
  repo: 'my-project',
  token: process.env.GH_TOKEN
});
```

---

#### `create(title: string, body: string): Promise<PRResult>`

Creates a new pull request.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | `string` | Yes | The PR title |
| `body` | `string` | Yes | The PR body/description (supports Markdown) |

**Returns:** `Promise<PRResult>` - The created PR details

**PRResult Interface:**

```typescript
interface PRResult {
  title: string;      // The PR title
  body: string;       // The PR body
  url: string;        // The PR URL
  number?: number;    // PR number (if available)
  state?: string;     // PR state (open, closed, merged)
  createdAt?: string; // Creation timestamp
}
```

**Example:**

```typescript
const newPR = await pr.create(
  'feat: Add user profile page',
  `## Summary
This PR adds a new user profile page with the following features:

- View user information
- Edit profile details
- Upload avatar
- View activity history

## Screenshots
[Attach screenshots here]

## Testing
- [ ] Unit tests added
- [ ] E2E tests added
- [ ] Manual testing completed
`
);

console.log(`Created PR #${newPR.number}: ${newPR.url}`);
```

---

### Hooks Class

The `Hooks` class provides utilities for managing Git hooks.

#### Constructor

```typescript
new Hooks(options?: HooksOptions)
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `HooksOptions` | No | Configuration options |
| `options.hooksDir` | `string` | No | Custom hooks directory path |
| `options.templateDir` | `string` | No | Template directory for hook scripts |

**Example:**

```typescript
const hooks = new Hooks({
  hooksDir: '/path/to/custom/hooks',
  templateDir: '/path/to/templates'
});
```

---

#### `install(name: string): string`

Generates a Git hook script for the specified hook name.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | The hook name (e.g., 'pre-commit', 'post-commit') |

**Returns:** `string` - The hook script content

**Supported Hooks:**

| Hook Name | Description | Trigger |
|-----------|-------------|---------|
| `pre-commit` | Runs before a commit is created | `git commit` |
| `prepare-commit-msg` | Runs before the commit message editor | `git commit` |
| `commit-msg` | Validates commit message format | `git commit` |
| `post-commit` | Runs after a commit is created | `git commit` |
| `pre-push` | Runs before pushing to remote | `git push` |
| `post-push` | Runs after pushing to remote | `git push` |
| `pre-rebase` | Runs before rebasing | `git rebase` |
| `post-checkout` | Runs after checkout | `git checkout` |

**Example:**

```typescript
// Generate a pre-commit hook
const preCommit = hooks.install('pre-commit');
console.log(preCommit);

// Generate a post-commit hook
const postCommit = hooks.install('post-commit');
console.log(postCommit);

// Save hook to file
import { writeFileSync } from 'fs';

const hookContent = hooks.install('pre-commit');
writeFileSync('.git/hooks/pre-commit', hookContent, { mode: 0o755 });
```

---

## ⚙️ Configuration

GitForge can be configured through various methods:

### Via Configuration File

Create a `gitforge.config.js` or `gitforge.config.ts` in your project root:

```javascript
// gitforge.config.js
export default {
  // Workflow settings
  workflow: {
    basePath: './',
    dryRun: false,
    verbose: true,
    defaultBranch: 'main'
  },
  
  // PR settings
  pr: {
    owner: 'your-org',
    repo: 'your-repo',
    token: process.env.GH_TOKEN,
    defaultBase: 'main',
    autoAssign: ['reviewer1', 'reviewer2'],
    labels: ['automated', 'gitforge']
  },
  
  // Hooks settings
  hooks: {
    hooksDir: '.git/hooks',
    templateDir: './hooks/templates',
    autoInstall: true,
    verbose: true
  }
};
```

### Via Environment Variables

```bash
# GitHub/GitLab Token
export GITHUB_TOKEN=your-token-here

# Default repository
export GITFORGE_OWNER=your-org
export GITFORGE_REPO=your-repo

# Paths
export GITFORGE_HOOKS_DIR=.git/hooks

# Behavior
export GITFORGE_VERBOSE=true
export GITFORGE_DRY_RUN=false
```

### Via Code

```typescript
import { Workflow, PR, Hooks } from 'gitforge';

// All options can be passed via constructor
const workflow = new Workflow({
  basePath: '/custom/path',
  verbose: true,
  dryRun: true
});

const pr = new PR({
  owner: 'custom-org',
  repo: 'custom-repo',
  token: 'custom-token'
});

const hooks = new Hooks({
  hooksDir: '/custom/hooks/dir'
});
```

---

## 💡 Best Practices

### Commit Squashing

1. **Always review commits before squashing** - Make sure you understand which changes will be combined
2. **Write clear commit messages** - After squashing, ensure the resulting commit message is clear and descriptive
3. **Don't squash shared commits** - Avoid squashing commits that have been pushed and shared with others
4. **Use draft PRs for work-in-progress** - Keep your feature branch clean until ready for review

```typescript
// Good practice: Check commits before squashing
const workflow = new Workflow({ verbose: true });
const commits = ['a1', 'a2', 'a3'];
console.log(`About to squash ${commits.length} commits`);
workflow.squash(commits);
```

### Pull Requests

1. **Use descriptive titles** - Include type (feat, fix, docs) and brief description
2. **Write detailed bodies** - Explain the "why" not just the "what"
3. **Link related issues** - Reference related tickets or PRs
4. **Keep PRs focused** - One PR should do one thing

```typescript
// Good practice: Comprehensive PR
const pr = new PR();
await pr.create(
  'feat(auth): Add OAuth2 support for Google and GitHub',
  `## Motivation
Users requested social login options to reduce friction during sign-up.

## Changes
- Added Google OAuth2 integration
- Added GitHub OAuth2 integration
- Updated user model to support multiple providers
- Added migration scripts

## Testing
- Unit tests for OAuth flow
- Integration tests with test accounts
- Manual testing with production-like setup

## Related Issues
Closes #123
See also #456
`
);
```

### Git Hooks

1. **Keep hooks fast** - Hooks run synchronously; keep them quick
2. **Handle errors gracefully** - Provide helpful error messages
3. **Use absolute paths** - When referencing files in hooks, use absolute paths
4. **Test your hooks** - Verify hooks work before relying on them

```typescript
// Good practice: Create robust hooks
const hooks = new Hooks();
const hookContent = hooks.install('pre-commit');

const enhancedHook = `
#!/bin/bash
# Enhanced pre-commit hook with error handling

set -e  # Exit on error

echo "Running pre-commit checks..."

# Run linter
echo "Running linter..."
npm run lint || {
  echo "❌ Linting failed. Please fix errors before committing."
  exit 1
}

# Run type check
echo "Running type check..."
npm run typecheck || {
  echo "❌ Type checking failed. Please fix errors before committing."
  exit 1
}

# Run tests (if any exist)
if [ -f "package.json" ] && grep -q '"test"' package.json; then
  echo "Running tests..."
  npm test || {
    echo "❌ Tests failed. Please fix tests before committing."
    exit 1
  }
fi

echo "✅ All pre-commit checks passed!"
`;
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Development Setup

```bash
# Clone the repository
git clone https://github.com/moggan1337/GitForge.git
cd GitForge

# Install dependencies
npm install

# Run development mode
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Lint code
npm run lint
```

### Submitting Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

This project uses:
- **ESLint** for JavaScript/TypeScript linting
- **Prettier** for code formatting
- **Conventional Commits** for commit messages

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 GitForge Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- Built with ❤️ for the developer community
- Inspired by the need for better Git automation tools
- Thanks to all contributors who help improve GitForge

---

<div align="center">

**Made with ⚒️ by the GitForge team**

⭐ Star us on GitHub | 📥 Install via npm | 📚 Read the Docs

</div>
