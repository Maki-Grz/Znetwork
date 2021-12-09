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

    client.on('messageCreate', async message => {
        try {
            if (message.type !== 'DEFAULT' || message.author.bot) return;
            if (message.content.startsWith(config.prefix)) return;
            //if (`${message.channel.id}` !== .......) return;

            let msg = message.content

            console.log(dataConfig)

            let findChannel = client.channels.cache.get("916345806062243882")

            findChannel.send(`**${message.author.username}** | ${msg}`)
            if (message.deletable) message.delete()


        } catch (error) {
            return error;
        }
    })

}