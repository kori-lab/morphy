const { Intents } = require('discord.js');
const Morphy = require('./src/Morphy');

const INTENTS_ALL =
  Object.values(Intents.FLAGS).reduce((acc, p) => acc | p, 0) &
  ~(Intents.FLAGS.GUILD_MEMBERS | Intents.FLAGS.GUILD_PRESENCE);

const client = new Morphy({
  token: process.env.DISCORD_TOKEN,
  prefix: process.env.DISCORD_PREFIX,
  intents: INTENTS_ALL,
});

client.start();
