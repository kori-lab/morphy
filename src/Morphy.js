const { Logs } = require('./');
const { Client } = require('discord.js');
const { readFileSync } = require('fs');
const colors = require('colors');

module.exports = class Morphy extends Client {
  /**
   * @typedef MorphyClientOptions
   * @prop {string} token
   * @prop {string} prefix
   */

  /**
   * @param {MorphyClientOptions & ClientOptions} options The client options
   */
  constructor(options) {
    super(options);
    this.validate(options);
  }

  async start() {
    const bigText = readFileSync('morphy-logo.txt', 'utf8');
    console.log(`\n${colors.green(bigText)}\n`);

    await this.login();
    this.logTag('MORPHY', 'Bot inicializado com sucesso!');
  }

  /**
   * @param {string} tag
   * @param {...string} args
   */
  logTag(tag, ...args) {
    Logs.logTag(tag, ...args);
  }

  /**
   * @param {MorphyClientOptions & ClientOptions} options
   */
  validate(options) {
    if (!options.token) {
      throw new Error('The client needs a token');
    }

    if (options.prefix && typeof options.prefix !== 'string') {
      throw new TypeError('The client prefix must be type of string');
    }

    this.token = options.token;
    this.prefix = options.prefix ?? 'm.';
  }
};
