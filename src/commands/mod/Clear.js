const { Message, MessageEmbed } = require('discord.js');
const { Command } = require('../..');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'clear',
      aliases: ['limpar'],
      category: 'Mod',
      description: 'Deleta as mensagens do chat atual.',
    });
  }

  /**
   * @param {Message} message
   * @param {string[]} args
   */
  async run(message, args) {
    if (!args[0] || (parseInt(args[0]) && !args[0] > 1000)) {
      const warnMessage = await message.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(
              `${message.author.username} você deve me dizer a quantia de mensgens que irei deletar.`
            )
            .setColor('RED'),
        ],
      });
      return setTimeout(() => warnMessage.delete().catch(() => {}), 20000);
    }
    const count =
      args[0] > 99 ? (args[0].slice(0, args[0].length - 2) + '00') / 100 : args[0];

    if (count > 99) {
      let i = 0;
      do {
        message.channel.messages
          .fetch({
            limit: 100,
          })
          .then(messages => messages.forEach(m => m.delete().catch(() => null)));
        i++;
      } while (count > i);
    }
    await message.channel.bulkDelete(args[0].slice(-2));

    message.reply({
      embeds: [
        new MessageEmbed()
          .setDescription(`Eu apaguei **${args[0]}** em ${message.channel}`)
          .setColor('GREEN'),
      ],
    });
  }
};
