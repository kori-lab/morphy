const { Client } = require('discord.js');
const { readFileSync } = require('fs');
const colors = require('colors');

const { Logs, FileUtils } = require('./');
const Loader = require('./structures/Loader');

module.exports = class Morphy extends Client {
  /**
   * @typedef MorphyClientOptions
   * @prop {string} token The client token
   * @prop {string} prefix The client default prefix
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
    console.log(`\n${colors.blue(bigText)}\n`);

    /**
     * @type {Record<string, Loader>}
     */
    const loaders = await FileUtils.requireDir({
      dirName: 'src/loaders',
      recursive: true,
    });

    /**
     * @type {[Loader[], Loader[]]}
     */
    const [preLoaders, normalLoaders] = Object.values(loaders)
      .map(Loader => new Loader(this))
      .reduce(
        ([pl, nl], n) => {
          if (n.preLoad) {
            return [[...pl, n], nl];
          }
          return [pl, [...pl, n]];
        },
        [[], []]
      );

    for (const loader of preLoaders) {
      await this.initializeLoader(loader);
    }

    await this.login();

    for (const loader of normalLoaders) {
      await this.initializeLoader(loader);
    }
  }

  /**
   * @param {Loader} loader
   */
  async initializeLoader(loader) {
    try {
      await loader.start();
    } catch (err) {
      console.error(err);
      if (loader.important) {
        process.exit();
      }
    }
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
    this.prefix = options.prefix || 'm.';
  }
};
