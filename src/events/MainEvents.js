const Morphy = require('../Morphy');
const { Event } = require('../');

module.exports = class MainEvents extends Event {
  /**
   * @param {Morphy} client
   */
  constructor(client) {
    super(client, {
      eventsOnce: ['ready'],
    });
  }

  async onceReady() {
    console.log(`The ${this.client.user.tag} is running!`);
  }
};
