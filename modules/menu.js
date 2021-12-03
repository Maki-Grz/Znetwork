const { MessageEmbed } = require('discord.js');
const { client } = require('../index');

const commands = client.commands;

const commandsList = [];

for (const value of commands.entries()) {
    commandsList.push({ name: value[1].name, value: value[1].help.description })
}

//console.log(commandsList)

module.exports.embedCommandes = new MessageEmbed()
.setAuthor(`Interface des commandes de ${client.user.username} - Commandes`, `${client.user.avatarURL()}`)
.setDescription(`${commandsList.map((e) => `**${e.name}** ➜ *${e.value}*\n`).join(" ")}`)
.setImage("https://i.imgur.com/XxooEsH.gif")
.setThumbnail("https://static.vecteezy.com/ti/vecteur-libre/p1/602787-modeles-de-conception-creative-lettre-z-logo-concept-vectoriel.jpg")