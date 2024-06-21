const { validateAndReadJsonFileSync } = require("./validator");
const { displayWelcomeMessage } = require("./welcomeMessage");

/**
 * Parses the command line arguments, extracts options, and validates the configuration source.
 *
 * @return {Object} The parsed options and runtime configuration object.
 */
function parseCommandLineArgs() {
  const args = process.argv.slice(2);
  const options = {
    configSrc: "",
    project: "",
    keysToUpload: [],
  };

  displayWelcomeMessage();

  for (let i = 0; i < args.length; i++) {
    const allowExtractArgs =
      i < args.length - 1 && !args[i + 1]?.startsWith("--");
    if (args[i] === "--configSrc" && allowExtractArgs) {
      options.configSrc = args[i + 1]?.trim();
    } else if (args[i] === "--project" && allowExtractArgs) {
      options.project = args[i + 1]?.trim();
    } else if (args[i] === "--keysToUpload" && allowExtractArgs) {
      const keysToUpload = args[i + 1];
      if (!!keysToUpload) {
        options.keysToUpload = keysToUpload
          .split(",")
          .map((fileType) => fileType?.trim());
      }
    }
  }

  if (!options.configSrc) {
    console.error("Error: --configSrc option is required.\n");
    process.exit(1);
  }

  // Check if the configSrc file exists and is of type json
  const runtimeConfig = validateAndReadJsonFileSync(options.configSrc);
  if (!runtimeConfig) process.exit(1);

  return { ...options, runtimeConfig };
}

module.exports = { parseCommandLineArgs };
