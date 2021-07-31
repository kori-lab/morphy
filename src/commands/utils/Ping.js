const { Message, MessageEmbed } = require('discord.js');
const { Command } = require('../..');

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
    const embed = new MessageEmbed().setColor('BLURPLE').setDescription('Carregando...');

    const msg = await message
      .reply({
        embeds: [embed],
      })
      .catch(() => null);

    if (msg) {
      const ms = msg.createdAt - message.createdAt;
      await msg
        .edit({
          embeds: [embed.setDescription(` Pong! \`${ms}ms\``)],
        })
        .catch(() => null);
    }
  }
};
