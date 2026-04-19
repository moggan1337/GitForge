# GitForge ⚒️

**Git Workflow Automation** - Squash, rebase, PRs.

## Features

- **🔀 Squash** - Combine commits
- **📋 Rebase** - Interactive rebase
- **📬 PR** - Create pull requests
- **🪝 Hooks** - Git hooks

## Installation

```bash
npm install gitforge
```

## Usage

```typescript
import { Workflow, PR, Hooks } from 'gitforge';

// Workflow
const wf = new Workflow();
wf.squash(['abc123', 'def456']);
wf.rebase();

// PR
const pr = new PR();
await pr.create('Feature', 'Add new feature');

// Hooks
const hook = new Hooks();
const content = hook.install('pre-commit');
```

## License

MIT
