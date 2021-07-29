const { Message } = require('discord.js');
const { Command } = require('../..');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      aliases: ['ms', 'latencia'],
    });
  }

  /**
   * @param {Message} message
   */
  async run(message) {
      
  }
}