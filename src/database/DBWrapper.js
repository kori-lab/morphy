const mongoose = require('mongoose');
const { Mongoose, MongooseOptions } = mongoose;

const { GuildRepository } = require('./repositories/GuildRepository');

module.exports = class DBWrapper {
  /**
   * @param {string} uri
   * @param {MongooseOptions} options
   */
  constructor(uri, options) {
    this.uri = uri;
    this.options = options;
    this.mongoose = mongoose;

    /**
     * @type {?GuildRepository}
     */
    this.guilds = null;
  }

  /**
   * @returns {Promise<Mongoose>}
   */
  async initialize() {
    return this.mongoose.connect(this.uri, this.options).then(async mongoose => {
      this.guilds = new GuildRepository(mongoose);
    });
  }
};
