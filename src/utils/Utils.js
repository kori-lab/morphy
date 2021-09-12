module.exports = class Utils {
  /**
   * @param {string} str
   * @returns {string}
   */
  static capitalize(str) {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  }
};
