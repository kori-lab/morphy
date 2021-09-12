const { ClientEvents } = require('discord.js');
const Morphy = require('../Morphy');

module.exports = class Event {
  /**
   * @typedef EventOptions
   * @prop {(keyof ClientEvents)[]} events
   * @prop {(keyof ClientEvents)[]} eventsOnce
   */

  /**
   * @param {Morphy} client
   * @param {EventOptions} options
   * @abstract
   */
  constructor(client, options) {
    this.client = client;
    this.events = options?.events ?? [];
    this.eventsOnce = options?.eventsOnce ?? [];
  }
};
