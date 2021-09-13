require('dotenv').config();

const { Logs } = require('./src');
const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./index.js', {
  token: process.env.DISCORD_TOKEN,
  totalShards: process.env.SHARD_AMOUNT || 'auto',
});

manager.on('shardCreate', shard => {
  Logs.shardLog(`O shard com o id ${shard.id} esta sendo inicializado...`);
  shard.on('ready', () => {
    Logs.shardLog(`O shard com o id ${shard.id} foi inicializado com sucesso!`);
  });
});

manager.spawn();
