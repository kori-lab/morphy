const { Message, MessageEmbed } = require('discord.js');
const Morphy = require('../Morphy');
const { Event } = require('../');

module.exports = class MainEvents extends Event {
  /**
   * @param {Morphy} client
   */
  constructor(client) {
    super(client, {
      eventsOnce: ['ready'],
      events: ['messageCreate'],
    });
  }

  async onceReady() {
    console.log(`The ${this.client.user.tag} is running!`);
  }

  /**
   * @param {Message} message
   */
  async onMessageCreate(message) {
    const { author, guild } = message;
    if (author.bot || !guild) {
      return;
    }

    const prefix = this.client.prefix.toLowerCase();
    const botMentionRegex = new RegExp(`^<@!${this.client.user.id}> `);

    const usedPrefix = message.content.match(botMentionRegex)
      ? message.content.match(botMentionRegex)[0]
      : prefix;

    if (!message.content.toLowerCase().startsWith(usedPrefix)) {
      return;
    }

    const [cmd, ...args] = message.content
      .slice(usedPrefix.length)
      .split(/ +/g)
      .map((x, i) => (i ? x : x.toLowerCase().trim()));

    if (!cmd.length) {
      return;
    }

    const command = this.client.commands.find(x => {
      return x.name.toLowerCase() === cmd || x.aliases?.includes(cmd);
    });

    if (command) {
      command.usedPrefix = usedPrefix;
      command.prefix = prefix;

      command.preRun(message, args);
    }
  }
};
