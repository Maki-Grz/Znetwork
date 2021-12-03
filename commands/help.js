const config = require('../config/config.json');
 
module.exports = {
    run: async (message, args, client) => {

        const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
        const { embedCommandes } = require('../modules/menu')

        if (args[0]) {
            const command = client.commands.get(args[0].toLowerCase())
            if (!command || !command.help) return message.channel.send('Cette commande n\'existe pas.')
            let embedHelp = new MessageEmbed()
            .setAuthor(`${command.name}`, `${client.user.displayAvatarURL()}`)
            .setImage("https://i.imgur.com/XxooEsH.gif")
            .setDescription(`${command.help.description}\n\nSyntaxe : \`${config.prefix}${command.name}${command.help.syntax ? ` ${command.help.syntax}` : ''}\``)
            await message.channel.send({ embeds: [embedHelp] });
        }
        else {
                const row = new MessageActionRow().addComponents(
                        new MessageButton()
                            .setCustomId('menu')
                            .setLabel('Menu')
                            .setEmoji('893542344001982486')
                            .setStyle("SUCCESS"),
                        new MessageButton()
                            .setCustomId('commandes')
                            .setLabel('📡 Commandes')
                            .setStyle("SECONDARY"),
                        new MessageButton()
                            .setCustomId('description')
                            .setLabel('👑 Description')
                            .setStyle("SECONDARY"),
                        new MessageButton()
                            .setCustomId('remerciements')
                            .setLabel('Remerciements')
                            .setEmoji('893769798243221524')
                            .setStyle("SECONDARY"),
                        );

            let embedHelp = new MessageEmbed()
                .setAuthor(`Interface des commandes de ${client.user.username} - Menu`, `${client.user.displayAvatarURL()}`)
                .setDescription(`**${client.user.username}** est un bot de discussion basé sur des "canaux" qui sont relier entres les serveurs ce qui permet aux membres de discuter ensemble sans être dans la même communauté. \n \n Veuillez choisir la commande, comme ceci : **.help <commandes>** pour avoir ses informations.\n`)
                .addField("📡 `Commandes`", "Affiche les commandes de la catégorie Commandes")
                .addField("📑 `Description`", "Affiche les commandes de la catégorie Description")
                .addField("💛 `Remerciements`", "Affiche les commandes de la catégorie Remerciements")
                .setImage("https://i.imgur.com/XxooEsH.gif")
                .setThumbnail("https://static.vecteezy.com/ti/vecteur-libre/p1/602787-modeles-de-conception-creative-lettre-z-logo-concept-vectoriel.jpg")
        
              const menu = await message.channel.send({ embeds: [embedHelp], components: [row] });

              const filter = i => i.user.id === message.author.id;
              const collector = menu.createMessageComponentCollector({ filter, time: 120000 });

              collector.on('collect', async i => {
                 switch (i.customId) {
                    case 'menu':
                        menu.edit({ embeds: [embedHelp], components: [row] });
                        break;
                    case 'commandes':
                        menu.edit({ embeds: [embedCommandes], components: [row] });
                        break;
                    case 'description':
                        menu.edit({ embeds: [embedDescription], components: [row] });
                        break;
                    case 'remerciements':
                        menu.edit({ embeds: [embedRemerciements], components: [row] });
                        break;
                  }
               });
            
            collector.on('end', collected => {
                //console.log(`Collected ${collected.size} items`)
                if(menu.deletable) menu.delete()
            });

            const member = message.author;
      
            async function button(interaction){
              if(interaction.type != 3) return;
              if(menu.id != interaction.message.id) return;
              client.api.interactions(interaction.id, interaction.token).callback.post({data:{type: 6}});
              let user = interaction.member ? interaction.member.user : interaction.user;
              if(user.id != member.id) return;
            }
            client.ws.on('INTERACTION_CREATE', button);
            setTimeout(() => {client.ws.off('INTERACTION_CREATE', button)}, 60000); // 60 secondes en ms
        }
        if(message.deletable) message.delete()
    },
    name: 'help',
    help: {
        description: 'Cette commande permet de voir la liste des commandes de Znetwork',
        syntax: '[nom de la commande]'
    }
}