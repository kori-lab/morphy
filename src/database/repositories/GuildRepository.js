const { Snowflake } = require('discord.js');
const { Mongoose } = require('mongoose');

const Repository = require('../Repository');

const Schema = require('../schemas/GuildSchema');

/**
 * @typedef GuildModel
 * @prop {Snowflake} _id
 * @prop {string} prefix
 */

/**
 * @extends {Repository<GuildModel>}
 */
module.exports.GuildRepository = class GuildRepository extends Repository {
  /**
   * @param {Mongoose} mongoose
   */
  constructor(mongoose) {
    super(mongoose, mongoose.model('Guilds', Schema));
  }

  /**
   * @returns {GuildModel}
   */
  parse(entity) {
    return {
      prefix: process.env.DISCORD_PREFIX,
      ...super.parse(entity),
    };
  }
};
