const { Message } = require('discord.js');
const { Command, MorphyEmbed } = require('../..');

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
    const amount = args.length 
      ? (Number.isInteger(Number(args[0])) ? Number(args[0]) : 0)
      : 10;

    if (amount < 2 || amount > 100) {
      return message.reply(
        new MessageEmbed()
          .setColor('YELLOW')
          .setDescription(`Use \`${this.fullname} [2 a 1000]\` para deletar as mensagens do chat atual rapidamente.`)
      ).catch(() => {});
    }
  
    try {
      const deleted = await message.channel.bulkDelete(amount)
        .then(msgs => msgs.size);

      const msg = await message.reply({
        embeds: [
          new MorphyEmbed()
            .setColor('GREEN')
            .setDescription(`**${deleted}** mensagens deletadas!`),
        ],
      });

      setTimeout(() => msg.delete().catch(() => {}), 5000);
    } catch(err) {
      message.reply({
        embeds: [
          new MorphyEmbed()
            .setColor('RED')
            .setDescription('Ocorreu um erro ao deletar as mensagens do canal atual.'),
        ]
      }).catch(() => {});
    }
  }
};
