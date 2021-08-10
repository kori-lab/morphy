const { Snowflake } = require('discord.js');
const { Mongoose, Model, FilterQuery, Document } = require('mongoose');
const transformProps = require('transform-props');

/**
 * Abstract class to extends all mongoose repositories.
 * @template T
 * @abstract
 */
module.exports = class Repository {
  /**
   * @param {Mongoose} mongoose
   * @param {Model} model
   */
  constructor(mongoose, model) {
    /**
     * @type {Mongoose}
     */
    this.mongoose = mongoose;

    /**
     * @type {Model}
     */
    this.model = typeof model === 'string' ? new Model(model) : model;
  }

  /**
   * @param {Document} entity
   * @returns {T}
   */
  parse(entity) {
    return entity
      ? transformProps(entity.toObject({ versionKey: false }), arg => String(arg), '_id')
      : null;
  }

  /**
   * @param {FilterQuery<T>|Snowflake} id
   * @param {any=} projection
   * @returns {?Promise<T>}
   */
  async findOne(id, projection) {
    if (typeof id === 'string') {
      return this.model.findById(id, projection).then(this.parse);
    }
    return this.model.findOne(id, projection).then(this.parse);
  }
};
