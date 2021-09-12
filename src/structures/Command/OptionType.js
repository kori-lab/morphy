const { Message } = require('discord.js');
const Morphy = require('../../Morphy');

module.exports = class OptionType {
  /**
   * @typedef {import('./Command').Options} Options
   */

  /**
   * @typedef OptionOptions
   * @prop {Morphy} client
   * @prop {Message} message
   * @prop {string} arg
   * @prop {Options} option
   */

  /**
   * @param {OptionOptions} options
   */
  constructor(options) {
    this.client = options.client;
    this.message = options.message;
    this.arg = options.arg;
    this.option = options.option;
  }

  /**
   * @abstract
   * @returns {any}
   */
  async handle() {}
};
