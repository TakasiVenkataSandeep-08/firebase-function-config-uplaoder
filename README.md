Certainly! Here's a comprehensive README for your CLI tool `firebase-function-config-uploader`:

---

# firebase-function-config-uploader

`firebase-function-config-uploader` is a CLI tool designed to simplify the process of uploading configuration settings to Firebase functions. It reads configuration data from a specified JSON file and uploads it to Firebase, either for all keys or a subset of keys. Additionally, it supports switching the active Firebase project before uploading the configuration.

## Features

- Uploads Firebase functions configuration from a specified JSON file.
- Supports selective key uploads.
- Supports nested keys in the configuration file.
- Switches to the specified Firebase project before uploading configuration.

## Installation

```sh
npm install -g firebase-function-config-uploader
```

## Usage

```sh
config-uploader --configSrc=./runtimeconfig.json --keysToUpload=key1,key2,key3 --project=projectId
```

### Options

- `--configSrc`: **(required)** Path to the JSON file containing the Firebase functions configuration.
- `--keysToUpload`: **(optional)** Comma-separated list of keys to upload from the configuration file. If not specified, all keys from the configuration file will be uploaded.
- `--project`: **(optional)** Firebase project ID to which the configuration should be uploaded. If specified, this project will be set as the current active project before the upload.

## Example

### Upload All Keys from Configuration File

```sh
config-uploader --configSrc=./.runtimeconfig.json
```

### Upload Specific Keys from Configuration File

```sh
config-uploader --configSrc=./.runtimeconfig.json --keysToUpload=key1,key2
```

### Upload to a Specific Project

```sh
config-uploader --configSrc=./.runtimeconfig.json --project=my-firebase-project
```

### Upload Specific Keys to a Specific Project

```sh
config-uploader --configSrc=./.runtimeconfig.json --keysToUpload=key1,key2 --project=my-firebase-project
```

## How It Works

1. **Configuration Source (`--configSrc`)**: Specifies the path to the JSON file containing the configuration. This file should be structured as a key-value pair JSON.
2. **Keys to Upload (`--keysToUpload`)**: If provided, only the specified keys will be uploaded to Firebase. Otherwise, all keys from the configuration file will be uploaded.
3. **Project (`--project`)**: If a project ID is provided, the tool will set this project as the current active project using Firebase CLI commands before uploading the configuration.

## Prerequisites

- Node.js and npm installed.
- Firebase CLI installed and configured with the necessary permissions.
- Ensure you are authenticated with Firebase CLI by running `firebase login`.

## License

This project is licensed under the MIT License.

## Contributions

Contributions are welcome! Please open an issue or submit a pull request.

## Support

If you encounter any issues or have questions, feel free to open an issue on the [GitHub repository](https://github.com/TakasiVenkataSandeep-08/firebase-function-config-uploader).
