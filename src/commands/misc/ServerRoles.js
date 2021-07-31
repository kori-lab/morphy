const { Message, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { Command } = require('../..');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'cargos',
      aliases: ['server-roles', 'serverroles', 'roleserver', 'rs'],
      category: 'Diversos',
      description: 'Obtenha uma lista com os cargos do servidor.',
    });
  }

  /**
   * @param {Message} message
   */
  async run(message) {
    const { guild, member } = message;

    const everyoneRole = guild.roles.everyone;
    const guildRoles = guild.roles.cache.array().filter(x => x.id !== everyoneRole.id);

    if (!guildRoles.length) {
      return message.reply(`O servidor não possuí nenhum cargo criado até o momento.`);
    }

    const limit = 10;
    const pages = Math.ceil(guildRoles.length / limit);

    let currentPage = 1;

    const previousBtn = new MessageButton()
      .setCustomId('v')
      .setLabel('Voltar')
      .setStyle('PRIMARY');

    const nextBtn = new MessageButton()
      .setCustomId('a')
      .setLabel('Avançar')
      .setStyle('PRIMARY');

    const actionRow = new MessageActionRow().addComponents(previousBtn, nextBtn);

    function getEmbed() {
      const embed = new MessageEmbed().setColor('#0084FF').setTitle('Cargos do servidor');

      if (pages > 1) {
        embed.setFooter(`Página ${currentPage} de ${pages}`);
      }

      const start = (currentPage - 1) * limit;
      const end = start + limit;

      for (let i = start; i < end; i++) {
        const role = guildRoles[i];
        if (role) {
          const hasRole = member.roles.cache.has(role.id);
          embed.setDescription(
            [embed.description ?? '', `${role} ${hasRole ? '✅' : ''}`].join('\n')
          );
        }
      }
      return embed;
    }

    const msg = await message.reply({
      embeds: [getEmbed()],
      components: pages > 1 ? [actionRow] : null,
    });

    if (!msg) return;
    if (pages <= 1) return;

    const filter = interaction => interaction.user.id === member.id;
    const collector = msg.createMessageComponentCollector({
      filter,
      idle: 60000,
    });

    collector.on('collect', async interaction => {
      const { customId } = interaction;
      
      if (customId === 'v') {
        currentPage = currentPage - 1 >= 1 ? currentPage - 1 : pages;
      } else if (customId === 'a') {
        currentPage = currentPage + 1 <= pages ? currentPage + 1 : 1;
      }

      await msg
        .edit({
          embeds: [getEmbed()],
        })
        .catch(() => null);
        interaction.deferUpdate().catch(() => null)
    });
  }
};
