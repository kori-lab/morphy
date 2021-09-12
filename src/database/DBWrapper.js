const mongoose = require('mongoose');
const { Mongoose, MongooseOptions } = mongoose;

const { GuildRepository } = require('./repositories/GuildRepository');
<<<<<<< HEAD
const { UserRepository } = require('./repositories/UserRepository');
=======
>>>>>>> 40a24bdc9b96b4e95b5873ec791473385c69ba14

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
<<<<<<< HEAD

    /**
     * @type {?UserRepository}
     */
    this.users = null;
=======
>>>>>>> 40a24bdc9b96b4e95b5873ec791473385c69ba14
  }

  /**
   * @returns {Promise<Mongoose>}
   */
  async initialize() {
    return this.mongoose.connect(this.uri, this.options).then(async mongoose => {
      this.guilds = new GuildRepository(mongoose);
<<<<<<< HEAD
      this.users = new UserRepository(mongoose);
      return mongoose;
=======
>>>>>>> 40a24bdc9b96b4e95b5873ec791473385c69ba14
    });
  }
};
