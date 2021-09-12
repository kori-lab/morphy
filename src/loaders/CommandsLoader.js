const { Loader, FileUtils, Command } = require('../');

module.exports = class CommandsLoader extends Loader {
  constructor(client) {
    super(client);
  }

  async start() {
    /**
     * @type {Record<string, Command>}
     */
    const commandsFiles = await FileUtils.requireDir({
      dirName: 'src/commands',
      recursive: true,
    });

    let success = 0;
    for (const path in commandsFiles) {
      const CommandFile = commandsFiles[path];

      try {
        const command = new CommandFile(this.client);
        this.client.commands.push(command);
        success++;
      } catch (err) {
        console.error(err);
      }
    }

    console.log(
      `Successfully ${success} commands of ${Object.keys(commandsFiles).length} loaded!`
    );
  }
};
