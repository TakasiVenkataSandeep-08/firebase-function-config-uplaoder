/**
 * Returns the value of a nested property in an object, given a key path.
 *
 * @param {Object} obj - The object to search for the nested property.
 * @param {string|string[]} keyPath - The key path to the nested property.
 * @return {string|undefined} - The value of the nested property, or undefined if the key path is invalid or the property is not found.
 * @throws {Error} - If the key path is invalid.
 */
function getValue(obj, keyPath) {
  if (typeof keyPath === "string") {
    keyPath = keyPath.split(".");
  }

  if (!Array.isArray(keyPath) || keyPath.length === 0) {
    throw new Error("Invalid key path");
  }

  let currentObj = obj;
  for (const key of keyPath) {
    if (currentObj && typeof currentObj === "object" && key in currentObj) {
      currentObj = currentObj[key];
    } else {
      return undefined; // Return undefined if any key is not found
    }
  }
  if (currentObj && typeof currentObj === "string") {
    return currentObj;
  }
  return undefined;
}

/**
 * Creates a Firebase configuration string based on the provided JSON object and keys to upload.
 *
 * @param {Object} runtimeConfig - The JSON object containing the configuration values.
 * @param {Array<string>} keysToUpload - An array of keys to upload from the JSON object. If empty, the entire JSON object will be flattened.
 * @return {string} The Firebase configuration string in the format "firebase functions:config:set <key1>=<value1> <key2>=<value2> ...".
 * If no keys are provided or no valid keys are found in the JSON object, a warning message is logged and the process exits with code 1.
 */
function createFirebaseConfig(runtimeConfig, keysToUpload) {
  let config = "";
  if (keysToUpload.length > 0) {
    keysToUpload.forEach((key) => {
      const value = getValue(runtimeConfig, key);
      if (value === undefined) {
        console.warn(
          `Skipped -> key: "${key}" not found in the configuration or it's value is not a string.`
        );
      } else {
        config += `${key}="${value}" `;
      }
    });
  } else {
    const flattenObject = (obj, prefix = "") => {
      Object.entries(obj).forEach(([key, value]) => {
        const prefixedKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === "object") {
          flattenObject(value, prefixedKey);
        } else {
          config += `${prefixedKey}="${value}" `;
        }
      });
    };
    flattenObject(runtimeConfig);
  }
  if (config) {
    return `firebase functions:config:set ${config.trim()}`;
  } else {
    console.warn("Nothing to Upload so exiting process");
    process.exit(1);
  }
}

module.exports = { createFirebaseConfig };
