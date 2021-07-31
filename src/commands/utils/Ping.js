const { Message } = require('discord.js');
const { Command, PaginatedEmbed } = require('../..');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      aliases: ['ms', 'latencia'],
      category: 'Utilidade',
      description: 'Obtenha a latência do bot.',
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
