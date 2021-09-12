const { Message } = require('discord.js');
const { Command, MorphyEmbed } = require('../..');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'money',
      aliases: ['dinheiro', 'saldo'],
      category: 'Economia',
      description: 'Obtem seu saldo atual no bot.',
    });
  }

  /**
   * @param {Message} message
   * @param {string[]} args
   */
  async run(message, args) {
    const data = await this.client.database.users.findOne(message.author.id, 'money');

    const embed = new MorphyEmbed()
      .setColor('BLURPLE')
      .setDescription(`Você possui: **${data.money} :coin:**`);

    message.reply({ embeds: [embed] }).catch(() => {});
  }
};
