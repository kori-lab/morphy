const colors = require('colors');

module.exports = class Logs {
  /**
   * @param  {...string} args
   */
  static shardLog(...args) {
    const tag = colors.bgWhite.black.bold('SHARD');
    console.log(tag, ...args);
  }

  /**
   * @param {string} tag
   * @param {...string} args
   */
  static logTag(tag, ...args) {
    console.log(colors.bgMagenta.white.bold(tag), ...args);
  }
};
