const { MessageEmbed } = require('discord.js');
const { client } = require('../index');

const commands = client.commands;
const iterator = commands.entries();

const commandsList = [];

console.log(iterator.next().value[1].name)

commandsList.push({ name: "test" })

console.log(commandsList)

module.exports.embedCommandes = new MessageEmbed()
.setAuthor(`Interface des commandes de ${client.user.username} - Commandes`, `${client.user.avatarURL()}`)
.setImage("https://i.imgur.com/XxooEsH.gif")
.setThumbnail("https://static.vecteezy.com/ti/vecteur-libre/p1/602787-modeles-de-conception-creative-lettre-z-logo-concept-vectoriel.jpg")