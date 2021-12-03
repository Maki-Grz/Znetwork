//----------Delete all slash's----------
/* client.on('ready', async () => {
  console.log("")
  
  let cmdArrGlobal = await client.api.applications(client.user.id).guilds('686114664731377703').commands.get()
  cmdArrGlobal.forEach(element => {
      console.log("Global command loaded : " + element.name + " (" + element.id + ")" )
      client.api.applications(client.user.id).guilds('686114664731377703').commands(element.id).delete();
      console.log(`Delete : ${element.name}`)
  });
}); */

/* client.on('ready', () => {
  console.log(client.guilds.cache.map(m => m.roles.cache.map(p => `${p.name} - ${p.id}`))[0]);
  console.log(client.guilds.cache.map(m => `${m.name} - ${m.id}`))
  client.guilds.cache.get('id du server').leave();
}); */

//----------Slash's commands creator----------
/* client.on('ready', async () => {
  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      client.api.applications(client.user.id).guilds('686114664731377703').commands.post({ data: {
          name: command.name,
          description: command.help.description,
      }})
      client.commands.set(command.name, command);
      console.log(`Command POST : ${command.name} from ${file} (${command.global ? "global" : "guild"})`)
  }
  console.log("")
  
  let cmdArrGuild = await client.api.applications(client.user.id).guilds('686114664731377703').commands.get()
  console.log("")
  cmdArrGuild.forEach(element => {
      console.log("Guild command loaded : " + element.name + " (" + element.id + ")")
  });
  console.log("")
}); */