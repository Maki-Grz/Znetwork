const { configuration } = require("../model/index");
const { client } = require('../index')

module.exports = {

    init: async () => {
        server()
    },
};

async function server() {

    const dataConfig = await configuration.find({ canal: 'dev-fr' });

    client.on('messageCreate', async message => {
        try {
            console.log("ok 1")

            if (message.type !== 'DEFAULT' || message.author.bot) return;
            //if (`${message.channel.id}` !== .......) return;


            console.log("ok 2")

            let msg = message.content
            let channelBdd = dataConfig

            console.log(channelBdd)

            let findChannel = client.channels.cache.get(channelBdd)

            findChannel.send(msg)


        } catch (error) {
            return error;
        }
    })

}