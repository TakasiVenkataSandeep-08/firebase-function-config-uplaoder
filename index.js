const { createFirebaseConfig } = require("./utils/configHandler");
const { executeCommand } = require("./utils/executeCommand");
const { parseCommandLineArgs } = require("./utils/paramsExtractor");

const { runtimeConfig, keysToUpload, project } = parseCommandLineArgs();

const command = createFirebaseConfig(runtimeConfig, keysToUpload);

(async () => {
  if (project) {
    await executeCommand(`firebase use ${project}`);
  }
  await executeCommand(command);
})();
