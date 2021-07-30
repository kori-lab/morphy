const {
  Message,
  User,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require('discord.js');
const { Command } = require('../..');

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

    const msg = await message
      .reply({
        embeds: [
          new MessageEmbed()
            .setDescription(`\\✨ Avatar de **${target.tag}**`)
            .setImage(targetAvatar)
            .setColor('#313131')
            .setFooter(
              author.username,
              author.displayAvatarURL({ format: 'png', dynamic: true })
            )
            .setTimestamp(),
        ],
        components: [
          new MessageActionRow().addComponents(
            new MessageButton().setEmoji('🗑').setCustomId('delete').setStyle('DANGER'),

            new MessageButton().setEmoji('🖼').setURL(targetAvatar).setStyle('LINK')
          ),
        ],
      })
      .catch(() => null);

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
