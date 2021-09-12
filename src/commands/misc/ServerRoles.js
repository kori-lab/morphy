const { Message } = require('discord.js');
const { Command, PaginatedEmbed, MorphyEmbed } = require('../..');

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
    const { guild, author, channel, member } = message;

    const everyoneRole = guild.roles.everyone;
    const guildRoles = [...guild.roles.cache.values()].filter(
      x => x.id !== everyoneRole.id
    );

    if (!guildRoles.length) {
      return message.reply(`O servidor não possuí nenhum cargo criado até o momento.`);
    }

    const template = new MorphyEmbed({
      user: author,
    })
      .setColor('BLURPLE')
      .setTitle(`Cargos do servidor`)
      .setFooter(guild.name, guild.iconURL({ format: 'png', dynamic: true }));

    const paginatedEmbed = new PaginatedEmbed({
      client: this.client,
      author,
      channel,
      limit: 10,
      values: guildRoles.map(x => ({ id: x.id, value: x.name })),
      template,
      onCreate: id => {
        const hasRole = member.roles.cache.has(id);
        return `<@&${id}> ${hasRole ? `\`✔️\`` : ''}`;
      },
    });

    paginatedEmbed.send();
  }
};
