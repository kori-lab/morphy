const { Message } = require('discord.js');
const { Command, PaginatedEmbed, MorphyEmbed } = require('../../');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'canais',
      aliases: ['server-channels', 'channels'],
      category: 'Diversos',
      description: 'Obtenha todos canais do servidor em uma lista.',
    });
  }

  /**
   * @param {Message} message
   */
  async run(message) {
    const { author, guild, channel } = message;

    const channels = guild.channels.cache.map(x => ({
      id: x.id,
      value: x.name,
    }));

    const template = new MorphyEmbed({
      user: author,
    }).setTitle('Canais do servidor');

    const paginatedEmbed = new PaginatedEmbed({
      author,
      channel,
      client: this.client,
      limit: 3,
      onCreate: (id, _, index) => {
        return `\`${index + 1}°\` <#${id}>`;
      },
      values: channels,
      template,
    });

    paginatedEmbed.send();
  }
};
