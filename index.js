const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.DIRECT_MESSAGES] });

module.exports = {
  client,
};

console.log("|<          Znetwork         >|");

//!----------Client Core Release--------
const config = require('./config/config.json');
const fs = require('fs');
const mongoose = require('mongoose');
const { logger } = require('./server/logger');

client.login(config.token);
client.commands = new Discord.Collection();

client.mongoose = require("./core/mongoose");
client.mongoose.init();

client.argus = require("./core/argus");
client.argus.init();

logger.info("Client Core Release is ready for actions")

//!---------All System---------
client.on('messageCreate', async message => {
  try {
    if (message.type !== 'DEFAULT' || message.author.bot) return;

    const args = message.content.trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    if (!commandName.startsWith(config.prefix)) return;
    const command = client.commands.get(commandName.slice(config.prefix.length));
    if (!command) return;
    command.run(message, args, client);
  } catch (error) {
    return;
  }
})