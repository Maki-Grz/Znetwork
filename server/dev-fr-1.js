const { configuration } = require("../model/index");
const { client } = require('../index');
const config = require('../config/config.json');

module.exports = {

    init: async () => {
        server()
    },
};

async function server() {

    const dataConfig = await configuration.find({ canal: 'dev-fr' });

    let cooldown = new Set()

    client.on('messageCreate', async (message, interaction) => {
        try {
            if (message.type !== 'DEFAULT' || message.author.bot) return;
            if (message.content.startsWith(config.prefix)) return;
            if (!dataConfig.map(e => e._doc.salon).find(element => element === message.channel.id)) return;
            if (cooldown.has(message.author.id)) {
                return message.reply('Vous ne pouvez écrire que **un seul message par minute**').then(message => {
                    setTimeout(() => { if (message.deletable) message.delete() }, 10000)
                })
            } else {

                cooldown.add(message.author.id)
                setTimeout(() => { cooldown.delete(message.author.id) }, 60000)

                let msg = message.content;

                let salonArray = dataConfig.filter(e => e._doc.salon !== message.channel.id).map(e => e._doc.salon);

                salonArray.forEach((item, index) => {
                    let findChannel = client.channels.cache.get(`${item}`);
                    findChannel.send(`**${message.author.tag}** | ${msg}`);


                })
                if (message.deletable) message.delete()
            } //60 secondes d'attente
        } catch (error) {
            return error;
        }
    })

}