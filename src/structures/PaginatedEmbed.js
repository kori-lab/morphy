const {
  TextChannel,
  MessageEmbed,
  User,
  Message,
  MessageActionRow,
  MessageButton,
} = require('discord.js');
const MorphyEmbed = require('./MorphyEmbed');
const Morphy = require('../Morphy');

module.exports = class PaginatedEmbed {
  /**
   * @typedef Value
   * @prop {string} id
   * @prop {any} value
   */

  /**
   * @typedef PaginatedEmbedData
   * @prop {Morphy} client
   * @prop {Value[]} values
   * @prop {TextChannel} channel
   * @prop {?number} limit
   * @prop {?MessageEmbed} template
   * @prop {?User} author
   * @prop {(id: string, value: any, index: number) => Promise<string>} onCreate
   * @prop {(embed: MessageEmbed) => Promise<MessageEmbed>} onReady
   */

  /**
   * @param {PaginatedEmbedData} data
   */
  constructor(data) {
    /**
     * @type {Morphy}
     */
    this.client = data.client;

    /**
     * @type {TextChannel}
     */
    this.channel = data.channel;

    /**
     * @type {?User}
     */
    this.author = data.author;

    /**
     * @type {Value[]}
     */
    this.values = data.values;

    /**
     * @type {number}
     */
    this.limit = data.limit ?? 5;

    /**
     * @type {?MessageEmbed}
     */
    this.template = data.template;

    /**
     * @type {MorphyEmbed}
     */
    this.embed = new MorphyEmbed({ data: data.template });

    /**
     * @type {(id: string, value: any, index: number) => Promise<string>}
     */
    this.onCreate = data.onCreate;

    /**
     * @type {(embed: MessageEmbed) => Promise<MessageEmbed>}
     */
    this.onReady = data.onReady;

    /**
     * @type {number}
     */
    this.pages = Math.ceil(this.values.length / this.limit);

    /**
     * @type {number}
     */
    this.currentPage = 1;
  }

  /**
   * @returns {Message}
   */
  async send() {
    /**
     * @type {Message}
     */
    const message = await this.channel
      .send({
        embeds: [await this.getEmbed()],
        components: this.pages > 1 ? [this.getButtons()] : null,
      })
      .catch(() => null);

    if (!message || this.pages <= 1) return;

    const filter = interaction => {
      if (!this.author) return true;
      return interaction.user.id === this.author.id;
    };

    const collector = message.createMessageComponentCollector({
      filter,
      idle: 120000,
    });

    collector.on('collect', async interaction => {
      const { customId } = interaction;

      if (customId === 'delete') {
        return collector.stop();
      }

      if (customId === 'previous') {
        this.currentPage = this.currentPage - 1 < 1 ? this.pages : this.currentPage - 1;
      }

      if (customId === 'next') {
        this.currentPage = this.currentPage + 1 > this.pages ? 1 : this.currentPage + 1;
      }

      await message
        .edit({
          embeds: [await this.getEmbed()],
        })
        .catch(() => null);

      await interaction.deferUpdate().catch(() => null);
    });

    collector.on('end', () => {
      message.delete().catch(() => null);
    });
  }

  /**
   * @private
   */
  async getEmbed() {
    const start = this.limit * (this.currentPage - 1);
    const end =
      this.limit * this.currentPage > this.values.length
        ? this.values.length
        : this.limit * this.currentPage;

    this.embed.description = '';
    for (let i = start; i < end; i++) {
      const value = this.values[i];
      let text = `**${i + 1}** - ${value.value}`;

      if (this.onCreate) {
        text = await this.onCreate(value.id, value.value, i);
      }

      this.embed.addDescription(text);
    }

    if (this.pages > 1) {
      const footerText = this.template?.footer?.text;

      this.embed.setFooter(
        `${footerText ? `${footerText} • ` : ''} Página ${this.currentPage} de ${
          this.pages
        }`.trim(),
        this.embed.footer?.iconURL
      );
    }

    return this.onReady ? this.onReady(this.embed) : this.embed;
  }

  /**
   * @private
   */
  getButtons() {
    const row = new MessageActionRow();

    const previousBtn = new MessageButton()
      .setCustomId('previous')
      .setLabel('❮')
      .setStyle('PRIMARY');

    const nextBtn = new MessageButton()
      .setCustomId('next')
      .setLabel('❯')
      .setStyle('PRIMARY');

    const deleteBtn = new MessageButton()
      .setCustomId('delete')
      .setLabel('🗑️')
      .setStyle('DANGER');

    return row.addComponents(previousBtn, nextBtn, deleteBtn);
  }
};
