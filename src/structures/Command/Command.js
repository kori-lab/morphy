/*eslint no-undef: "off"*/

const Morphy = require('../../Morphy');
const { Message, MessageEmbed } = require('discord.js');
const handlers = require('./types');

/**
 * @typedef Options
 * @prop {string} errorMsg
 * @prop {'USER' | 'STRING'} type
 * @prop {?boolean} required
 * @prop {?boolean} allowBot
 * @prop {?boolean} allowYourSelf
 */

module.exports = class Command {
  /**
   * @typedef CommandOptions
   * @prop {string} name
   * @prop {?string[]} aliases
   * @prop {?string} category
   * @prop {?description} description
   * @prop {?Options[]} options
   */

  /**
   * @param {Morphy} client
   * @param {CommandOptions} options
   * @abstract
   */
  constructor(client, options) {
    this.client = client;

    this.name = options.name;
    this.aliases = options.aliases ?? [];
    this.category = options.category ?? 'Geral';
    this.description = options.description;
    this.options = options.options;

    /**
     * @type {string}
     */
    this.usedPrefix;

    /**
     * @type {string}
     */
    this.prefix;
  }

  /**
   * @param {Message} message
   * @param {string[]} args
   * @abstract
   */
  async run(message, args) {}

  /**
   * @param {Message} message
   * @param {string[]} args
   */
  async preRun(message, args) {
    const parsedArgs = args.slice();
    if (this.options?.length) {
      for (let i = 0; i < this.options.length; i++) {
        const option = this.options[i];
        if (args[i]) {
          const Handler = handlers[option.type];
          if (Handler) {
            try {
              const handler = new Handler({
                client: this.client,
                message,
                arg: args[i],
                option,
              });
              parsedArgs[i] = await handler.handle();
            } catch (err) {
              const errorEmbed = new MessageEmbed()
                .setColor('RED')
                .setAuthor('Ocorreu um erro ❌')
                .setDescription(
                  `**Argumento ${i + 1}:** ${args[i]}\n\n**Erro:**\n${err.message}`
                );

              return message
                .reply({
                  embeds: [errorEmbed],
                })
                .catch(() => null);
            }
          } else {
            parsedArgs[i] = args[i];
          }
        } else if (option.required) {
          return message
            .reply(option.errorMsg ?? `O **${i + 1}°** argumento é obrigatório.`)
            .catch(() => null);
        }
      }
    }

    this.run(message, parsedArgs);
  }

  /**
   * @returns {MessageEmbed}
   */
  get fullname() {
    return `${this.usedPrefix}${this.name}`;
  }
};
