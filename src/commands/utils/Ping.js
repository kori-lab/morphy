const { Message } = require('discord.js');
const { Command } = require('../..');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      category: 'Developer',
      description: 'Descrubra mais sobre mim. 👿💝',
      aliases: ['ms', 'latencia'],
    });
  }

  /**
   * @param {Message} message
   */
  async run(message) {
    const msg = await message.reply('...').catch(() => null);

    if (msg) {
      const ms = msg.createdAt - message.createdAt;
      await msg.edit(`Pong! \`${ms}ms\``).catch(() => null);
    }
  }
};
