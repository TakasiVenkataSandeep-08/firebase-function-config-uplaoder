const fs = require("fs");
const path = require("path");

/**
 * Validates and reads a JSON file synchronously.
 *
 * @param {string} filePath - The path to the JSON file.
 * @return {Object|null} The parsed JSON content of the file, or null if the file is not valid or does not exist.
 */
function validateAndReadJsonFileSync(filePath) {
  try {
    const stats = fs.statSync(filePath);

    if (!stats.isFile()) {
      console.log(`${filePath} is not a file.`);
      return null;
    }

    if (path.extname(filePath).toLowerCase() !== ".json") {
      console.log(`${filePath} is not a JSON file.`);
      return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    try {
      const jsonContent = JSON.parse(fileContent);
      console.log(`${filePath} is a valid JSON file.`);
      return jsonContent;
    } catch (jsonErr) {
      console.error(`Error parsing JSON content of ${filePath}:`, jsonErr);
      return null;
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`${filePath} does not exist.`);
      return null;
    }
    console.error("Error:", err);
    return null;
  }
}

module.exports = { validateAndReadJsonFileSync };
