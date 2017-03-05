const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const config = require('./config.json');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  client.user.setGame(`${config.prefix}help | ${config.prefix}info`)
});

client.on('guildMemberAdd', member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`Welcome to ${guild.name} ${member.user}`);
});

client.on('message', msg => {
  delete require.cache[require.resolve(`./serverlog.js`)];
  require(`./serverlog.js`).log(msg, client);
  if(msg.author.bot) return;
  if (msg.channel.type === 'dm') return;

  require(`./commands/score.js`).onmsg(msg, client);

  if(!msg.content.startsWith(config.prefix)) return;
  const args = msg.content.substring(config.prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  let commandsList = fs.readdirSync('./commands/');
  client.commands = {};
  for (i = 0; i < commandsList.length; i++) {
    let item = commandsList[i];
    if (item.endsWith('.js')) {
        delete require.cache[require.resolve(`./commands/${item}`)];
        client.commands[item.slice(0, -3)] = require(`./commands/${item}`);
    }
  }
  if (command in client.commands) {
    if (args.includes('help')) {
      return msg.channel.sendMessage(client.commands[command].help);
    }
    if (args.includes('args')) {
      return msg.channel.sendMessage(client.commands[command].args);
    }
    client.commands[command].func(client, msg, args);
  }

});

client.login(config.token);
