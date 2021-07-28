const path = require('path');
const { readdirSync, lstatSync } = require('fs');

module.exports = class FileUtils {
  /**
   * @returns {string} The current directory path
   */
  static get directory() {
    return path.dirname(require.main.filename);
  }

  /**
   * @typedef RequireDirOptions
   * @prop {string} dirName The directory you need will require
   * @prop {?boolean} recursive If the function is recursive
   */

  /**
   * Requires a directory and return the required files
   * @param {RequireDirOptions} options
   * @returns {Promise<Record<string, any>>}
   */
  static async requireDir(options) {
    if (!options?.dirName) {
      throw new Error('The requireDir function needs the dirName option');
    }

    const recursive = !!options.recursive;
    const dirName = path.resolve(this.directory, options.dirName);

    const required = {};
    const files = readdirSync(dirName, 'utf8');

    return Promise.all(
      files.map(async filePath => {
        const fullPath = path.join(dirName, filePath);
        if (/\.(js|json)/.test(filePath)) {
          try {
            const requiredFile = require(fullPath);
            required[fullPath] = requiredFile;
          } catch (err) {
            console.error(err);
          }
        } else if (recursive) {
          const isDir = lstatSync(fullPath).isDirectory();
          if (isDir) {
            try {
              const dirFiles = await this.requireDir({
                ...options,
                dirName: fullPath,
              });

              Object.assign(required, dirFiles);
            } catch {}
          }
        }
      })
    ).then(() => required);
  }
};
