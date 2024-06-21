const { exec } = require("child_process");
const { promisify } = require("util");
const execAsync = promisify(exec);

/**
 * Executes a command asynchronously.
 *
 * @param {string} command - The command to be executed.
 * @return {Promise<void>} A promise that resolves when the command is executed.
 */
const executeCommand = async (command) => {
  try {
    const { stdout, stderr } = await execAsync(command);
    if (stdout) {
      console.log(stdout);
    }
    if (stderr) {
      console.error(stderr);
    }
  } catch (error) {
    console.error(`exec error: ${error}`);
  }
};

module.exports = { executeCommand };
