const OptionType = require('../OptionType');

module.exports = class extends OptionType {
  constructor(options) {
    super(options);
  }

  async handle() {
    const { author } = this.message;

    const user = await this.client.users
      .fetch(this.arg.replace(/[<@!>]/g, ''))
      .catch(() => null);

    if (!user) {
      throw new Error('Usuário inválido.');
    }

    if (this.option.allowBot === false && user.bot) {
      throw new Error('O usuário não pode ser um bot 🤖.');
    }

    if (this.option.allowYourSelf === false && user.id === author.id) {
      throw new Error('O usuário não pode ser você mesmo.');
    }

    return user;
  }
};
