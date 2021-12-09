module.exports = {
    run: async (message, args, client) => {

        const { configuration } = require("../model/index");
        const mongoose = require('mongoose');
        const { MessageEmbed, MessageSelectMenu } = require('discord.js');
        const { logger } = require('../server/logger');

        const dataConfig = await configuration.findOne({ server: message.guild.id });

        if (dataConfig) return message.channel.send(`Ce serveur a déjà une canal de discussion d'activé, il s'agit du salon <#${dataConfig.salon}> configuré sur le canal **${dataConfig.canal}**`).then(m => {
            setTimeout(() => { if (m.deletable) m.delete(); if (message.deletable) message.delete() }, 15000);
        })


        if (!message.mentions.channels.first()) return message.reply("Veuillez écrire correctement la commande et mentionner un salon, exemple: `z!setcanal [#votre-salon]`").then(m => {
            setTimeout(() => { if (m.deletable) m.delete(); if (message.deletable) message.delete() }, 10000);
        });

        const args1 = args[0];
        const args1After = args1.replace('<', '').replace('>', '').replace('#', '')
        let choiceConfigUser;

        if (!args1) return message.reply("Veuillez écrire correctement la commande, exemple: `z!setcanal [#votre-salon]`").then(m => {
            setTimeout(() => { if (m.deletable) m.delete(); if (message.deletable) message.delete() }, 10000);
        });


        const embed001 = new MessageEmbed()
            .setTitle("Canal de discussions - Configuration")
            .setColor("#F85252")
            .setDescription(`${message.author}, veuillez faire un choix de configuration pour le canal de discussions. \n Vous avez **30** secondes pour configurer le canal.`)

        const select = new MessageSelectMenu()
            .setCustomId("choice")
            .setPlaceholder("Choississez votre canal de discussions à relier au salon")
            .addOptions({ label: "Développement - FR", value: "dev-fr", description: "Synchronisation avec le canal de Développement français", emoji: "<:dev:820966666635706440>" })
            .addOptions({ label: "Anime - FR", value: "anime-fr", description: "Synchronisation avec le canal d'Anime français", emoji: "<:LewdMegumin:764487238632341534>" })
            .addOptions({ label: "Musique - FR", value: "musique-fr", description: "Synchronisation avec le canal de Musique français", emoji: "<:applemusic:916704282701598751>" })
            .addOptions({ label: "Dessin - FR", value: "dessin-fr", description: "Synchronisation avec le canal de Dessin français", emoji: "✏️" })

        await message.channel.send({ embeds: [embed001], components: [{ type: 1, components: [select.toJSON()] }] }).then(message => {
            setTimeout(() => { if (message.deletable) message.delete() }, 30000)
        })
        if (message.deletable) message.delete()

        const member = message.author;

        async function choice(interaction) {
            if (interaction.type != 3) return;
            if (interaction.data.custom_id != "choice") return;
            client.api.interactions(interaction.id, interaction.token).callback.post({ data: { type: 6 } });
            let user = interaction.member ? interaction.member.user : interaction.user;
            if (user.id != member.id) return;

            if (interaction) choiceConfigUser = interaction.data.values[0]

            if (interaction) message.channel.send("Préparation du récapitulatif...").then(m => {
                setTimeout(() => { if(m.deletable) m.delete() }, 10000);
            })
        }
        await client.ws.on('INTERACTION_CREATE', choice);
        setTimeout(() => {
            client.ws.off('INTERACTION_CREATE', choice);

            let recap = new MessageEmbed()
                .setAuthor(`Récapitulatif de la configuration`)
                .setDescription(`Canal de discussions synchronisé avec **${choiceConfigUser}**`)
                .setImage("https://i.imgur.com/XxooEsH.gif")
                .setThumbnail("https://media.istockphoto.com/vectors/settings-line-neon-icon-elements-of-business-illustration-line-icon-vector-id1173412266?k=20&m=1173412266&s=170667a&w=0&h=k3pCzJJPQR7WlWtzJ0VNPQ6mLRhtEW0tyOffKcOK0Es=")

            if (choiceConfigUser) return message.channel.send({ embeds: [recap] }).then(() => {
                dataPush()
                logger.info(`New canal connected to ${choiceConfigUser} in the server ${message.guild.id}`)
            })
        }, 30000); //30 secondes en ms

        function dataPush() {

            const newCanal = {
                canal: choiceConfigUser,
                server: message.guild.id,
                member: message.author.id,
                salon: args1After,
                date: new Date()
            }

            const merged = Object.assign(newCanal);
            const createCanal = new configuration(merged);
            createCanal.save();

        }

    },
    name: 'setcanal',
    class: "member",
    help: {
        description: 'Cette commande permet de définir le canal de discussion du serveur',
        syntax: '[#id du salon]'
    }
}