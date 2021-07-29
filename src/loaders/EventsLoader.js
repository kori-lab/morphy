const { Loader, FileUtils, Event: _Event, Utils } = require('..');
const Morphy = require('../Morphy');

module.exports = class EventsLoader extends Loader {
  /**
   * @param {Morphy} client
   */
  constructor(client) {
    super(client, {
      preLoad: true,
      important: true,
    });
  }

  async start() {
    /**
     * @type {Record<string, _Event>};
     */
    const eventFiles = await FileUtils.requireDir({
      dirName: 'src/events',
      recursive: true,
    });

    let success = 0;
    for (const path in eventFiles) {
      try {
        const EventFile = eventFiles[path];
        const event = new EventFile(this.client);

        event.events?.forEach(eventName => {
          const listener = event[`on${Utils.capitalize(eventName)}`];
          if (listener) {
            this.client.on(eventName, listener.bind(this));
          }
        });

        event.eventsOnce?.forEach(eventName => {
          const listener = event[`once${Utils.capitalize(eventName)}`];
          if (listener) {
            this.client.once(eventName, listener.bind(this));
          }
        });

        success++;
      } catch (err) {
        console.error(err);
      }
    }

    this.client.logTag(
      'LOADER',
      `Successfully loaded ${success} events of ${Object.keys(eventFiles).length}!`
    );
  }
};
