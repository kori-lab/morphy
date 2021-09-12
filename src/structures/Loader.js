const Morphy = require('../Morphy');

module.exports = class Loader {
  /**
   * @typedef LoaderOptions
   * @prop {?boolean} preLoad If the loader needs to load before all loaders
   * @prop {?boolean} important Break the client if the loader can't load
   */

  /**
   * The loader structure to extends every loaders that will be created
   * @param {Morphy} client The client to execute the loader
   * @param {LoaderOptions} options The loader options
   * @abstract
   */
  constructor(client, options) {
    this.client = client;
    this.preLoad = !!options?.preLoad;
    this.important = !!options?.important;
  }

  /**
   * The loader start function
   * @abstract
   */
  async start() {}
};
