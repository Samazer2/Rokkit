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

client.on('guildMemberRemove', member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`${member.user} has left the server`)
});

client.on('message', msg => {
  if(msg.author.bot) return;
  if (msg.channel.type === 'dm') return;

  require(`./commands/score.js`).onmsg(msg);

  if(!msg.content.startsWith(config.prefix)) return;
  const args = msg.content.substring(config.prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  Client = {
    config: require('./config.json'),
    bot: client
  }

  let commandsList = fs.readdirSync('./commands/');
  Client.commands = {};
  for (i = 0; i < commandsList.length; i++) {
    let item = commandsList[i];
    if (item.endsWith('.js')) {
        delete require.cache[require.resolve(`./commands/${item}`)];
        Client.commands[item.slice(0, -3)] = require(`./commands/${item}`);
    }
  }
  if (command in Client.commands) {
    if (args.includes('help')) {
      return msg.channel.sendMessage(Client.commands[command].help);
    }
    if (args.includes('args')) {
      return msg.channel.sendMessage(Client.commands[command].args);
    }
    Client.commands[command].func(Client, msg, args);
  }

});

client.login(config.token);
