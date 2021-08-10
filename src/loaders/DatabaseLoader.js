const { Loader, Logs } = require('../');
const DBWrapper = require('../database/DBWrapper');
const config = require('../configs/mongoose');

module.exports = class DatabaseLoader extends Loader {
  constructor(client) {
    super(client, {
      preLoad: true,
    });

    /**
     * @type {DBWrapper}
     */
    this.database = null;
  }

  async start() {
    try {
      await this.initialize();
      this.client.database = this.database;
      Logs.logTag('MONGODB', 'Connection estabilished!');
    } catch (err) {
      console.log('error ocurred');
      Logs.logError(err);
    }
  }

  async initialize() {
    this.database = new DBWrapper(process.env.MONGODB_URI, config);
    await this.database.initialize();
  }
};
