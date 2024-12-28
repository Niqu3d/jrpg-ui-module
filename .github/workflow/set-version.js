// .github/workflows/set-version.js

const core = require('@actions/core');

try {
  const ref = process.env.GITHUB_REF;

  if (ref.startsWith('refs/tags/v')) {
    // Extract version from tag (e.g., refs/tags/v1.2.3 -> 1.2.3)
    const version = ref.substring(10);
    core.setOutput('version', version);
  } else {
    // Extract major and minor version from branch name (e.g., main -> 1.0.0)
    const branchName = ref.replace('refs/heads/', '');
    const [major, minor] = branchName.split('.');
    const version = `${major}.${minor}.0`;
    core.setOutput('version', version);
  }
} catch (error) {
  core.setFailed(error.message);
}
