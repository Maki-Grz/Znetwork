const { client } = require('../index');
const os = require("os");
const fs = require('fs');

module.exports = {

    init: async () => {
        console.log(" ");
        console.log("-----------Argus------------");
        await stats();
        console.log("----------Commands----------");
        initialize();
        statues();
    },
};

async function stats() {
    const MemoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
    const RamUsed = Math.round(process.cpuUsage().system) / 1024;
    const RamUsage = Math.trunc(RamUsed);
    const MemoryUsed = Math.trunc(MemoryUsage);

    console.log(`Hébergement: ${os.hostname()}`);
    console.log(`Plateforme: ${process.platform}`);
    console.log(`RAM: ${RamUsage} Mb`);
    console.log(`Mémoire: ${MemoryUsed} Mb`);
};

function initialize() {
    fs.readdir('./commands', (err, files) => {
        if (err) throw err
        files.forEach(file => {
            if (!file.endsWith('.js')) return 
            const commands = require(`../commands/${file}`);
            client.commands.set(commands.name, commands);
            console.log(`${commands.name} : ✔️`)
        });
    });
};

async function statues() {
    client.on('ready', async () => {
        const statuses = [
            () => `Alpha 0.0.1`,
            () => `Progress Technologies`,
            () => `Znetwork à votre service: z!`,
        ]
        let i = 0
        setInterval(() => {
            client.user.setActivity(statuses[i](), {type: 'PLAYING'})
            i = ++i % statuses.length
        }, 20000)
        console.log("-----------Status-----------");
        console.log("Status: ✔️");
        console.log("----------------------------");
    })
}