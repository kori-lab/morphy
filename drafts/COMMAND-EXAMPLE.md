# Creating a new command

**First of all, you need to create a file in the folder `src/commands/`**

1° Copy the base code:

```js
const { Message } = require('discord.js');
const { Command } = require('../..');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'command-name',
      aliases: ['alias-1', 'alias-2'],
      category: 'General',
      description: 'Command description.',
    });
  }

  /**
   * @param {Message} message
   * @param {string[]} args
   */
  async run(message, args) {
    message.reply('Hello World!');
  }
};
```

Now you can add your command code to inside the run method!
