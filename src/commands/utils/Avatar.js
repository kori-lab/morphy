const {
  Message,
  User,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require('discord.js');
const { Command, MorphyEmbed } = require('../..');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'avatar',
      aliases: ['a', 'foto'],
      category: 'Utilidade',
      description: 'Obtenha o avatar de um usuário.',
      options: [
        {
          type: 'USER',
          required: false,
        },
      ],
    });
  }

  /**
   * @param {Message} message
   * @param {[User]} args
   */
  async run(message, [user]) {
    const { author } = message;
    const target = user ?? author;

    const targetAvatar = target.displayAvatarURL({ format: 'png', dynamic: true });

    const deleteBtn = new MessageButton()
      .setLabel('Excluir')
      .setCustomId('delete')
      .setStyle('DANGER');

    const linkBtn = new MessageButton()
      .setLabel('Baixar')
      .setURL(targetAvatar)
      .setStyle('LINK');

    const buttons = new MessageActionRow().addComponents(deleteBtn, linkBtn);

    const embedPhotographic = new MorphyEmbed({
      user: target,
    })
      .setImage(targetAvatar)
      .setColor('#313131')
      .setFooter(
        this.client.user.username,
        this.client.user.displayAvatarURL({ format: 'png', dynamic: true })
      )
      .setTimestamp();

    const msg = await message
      .reply({
        embeds: [embedPhotographic],
        components: [buttons],
      })
      .catch(() => null);

    if (!msg) return;

    const filter = interaction => interaction.user.id === author.id;
    await msg
      .awaitMessageComponent({
        filter,
        time: 120000,
      })
      .catch(() => null);

    message.delete().catch(() => null);
    msg.delete().catch(() => null);
  }
};
