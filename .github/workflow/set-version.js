// .github/workflows/set-version.js

const core = require('@actions/core');
const { execSync } = require('child_process');

try {
  const ref = process.env.GITHUB_REF;

  if (ref.startsWith('refs/tags/v')) {
    // Extract version from tag (e.g., refs/tags/v1.2.3 -> 1.2.3)
    const version = ref.substring(10);
    core.setOutput('version', version);
  } else {
    // Default to '0.1.0' for non-tag pushes
    core.setOutput('version', '0.1.0');
  }
} catch (error) {
  core.setFailed(error.message);
}
