const { Snowflake } = require('discord.js');
const { Mongoose } = require('mongoose');

const Repository = require('../Repository');

const Schema = require('../schemas/UserSchema');

/**
 * @typedef UserModel
 * @prop {Snowflake} _id
 * @prop {number} money
 */

/**
 * @extends {Repository<UserModel>}
 */
module.exports.UserRepository = class UserRepository extends Repository {
  /**
   * @param {Mongoose} mongoose
   */
  constructor(mongoose) {
    super(mongoose, mongoose.model('Users', Schema));
  }

  /**
   * @returns {UserModel}
   */
  parse(entity) {
    return {
      money: 0,
      ...super.parse(entity),
    };
  }
};
