const { MessageEmbed } = require('discord.js');
const { client } = require('../index');

const commands = client.commands;
const commandsList = [];

for (const value of commands.entries()) {
    commandsList.push({ name: value[1].name, value: value[1].help.description, class: value[1].class })
}

//console.log(commandsList)

module.exports.embedCommandes = new MessageEmbed()
.setAuthor(`Interface de ${client.user.username} - Commandes`, `${client.user.avatarURL()}`)
.setDescription(`${commandsList.filter(e => e.class == 'member').map((e) => `**${e.name}** ➜ *${e.value}*\n`).join(" ")}`)
.setImage("https://i.imgur.com/XxooEsH.gif")
.setThumbnail("https://static.vecteezy.com/ti/vecteur-libre/p1/602787-modeles-de-conception-creative-lettre-z-logo-concept-vectoriel.jpg")

module.exports.embedDescription = new MessageEmbed()
.setAuthor(`Interface de ${client.user.username} - Description`, `${client.user.avatarURL()}`)
.setDescription(`Znetwork à l'utilisateur de configurer un salon qui est relier avec plusieurs autres salons de serveurs différents pour former un seul et même canal de discussion.`)
.setImage("https://i.imgur.com/XxooEsH.gif")
.setThumbnail("https://static.vecteezy.com/ti/vecteur-libre/p1/602787-modeles-de-conception-creative-lettre-z-logo-concept-vectoriel.jpg")

module.exports.embedRemerciements = new MessageEmbed()
.setAuthor(`Interface de ${client.user.username} - Remerciements`, `${client.user.avatarURL()}`)
.setDescription(`💛 Je remercie **Zeldown#9963** à qui appartient l'__idée__ même du bot et son fonctionnement.\n\n Merci également aux serveurs qui ont ajouté *Znetwork* et l'utilisent. \n \n Mentions spéciales à: \n**Cyanic#0299** sans qui je n'aurais pas appris le JavaScript\n**TheLoulou** et **LuLuCide** les deux bêtas-testeuses du bot.`)
.setImage("https://i.imgur.com/XxooEsH.gif")
.setThumbnail("https://static.vecteezy.com/ti/vecteur-libre/p1/602787-modeles-de-conception-creative-lettre-z-logo-concept-vectoriel.jpg")