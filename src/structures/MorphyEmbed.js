const { MessageEmbed, User, GuildMember, MessageEmbedOptions } = require('discord.js');

module.exports = class MorphyEmbed extends MessageEmbed {
  /**
   * @typedef MorphyEmbedData
   * @prop {GuildMember | User} user
   * @prop {MessageEmbed | MessageEmbedOptions} data
   */

  /**
   * @param {MorphyEmbedData} data
   */
  constructor(data = {}) {
    super(data.data);

    /**
     * @type {GuildMember | User}
     */
    this.user = data.user;

    if (data.user) {
      const user = data.user instanceof GuildMember ? data.user.user : data.user;
      const avatar = user.displayAvatarURL({ format: 'png', dynamic: true });
      this.setAuthor(user.username, avatar, avatar);
    }
  }

  /**
   * @param {string} name
   * @param {?string} iconURL
   * @param {?string} url
   */
  setAuthor(name, iconURL, url) {
    let authorName = this.user ? `${this.author?.name ?? ''} ${name}`.trim() : name;
    super.setAuthor(authorName, iconURL ?? this.author?.url, url);
    return this;
  }

  /**
   * @param {string | any[]} description
   */
  addDescription(description) {
    const desc = Array.isArray(description) ? description.join('\n') : description;
    return this.setDescription([this.description, desc].join('\n'));
  }
};
