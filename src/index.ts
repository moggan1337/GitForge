export class Workflow { squash(commits: string[]) { return `squash ${commits.length} commits`; } rebase() { return 'interactive rebase'; } }
export class PR { create(title: string, body: string) { return { title, body, url: 'https://github.com/PR' }; } }
export class Hooks { install(name: string) { return `#!/bin/bash\n# ${name} hook`; } }
export default { Workflow, PR, Hooks };
