const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const moment = require('moment');
const fs = require("fs")

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  client.user.setGame(`${config.prefix}help | ${config.prefix}info`)
});

client.on('guildMemberAdd', member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`Welcome to ${guild.name} ${member.user}`);
  //member.addRole('284022835285065728').catch(console.error);

});

client.on('guildMemberRemove', member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`${member.user} has left the server`)
});

client.on('message', msg => {
  if(msg.author.bot) return;
  if(!msg.content.startsWith(config.prefix)) return;

  const args = msg.content.substring(config.prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'test') {
    msg.channel.sendMessage('No test command at this moment')
  }

  if (command === 'help') {
    msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle('Rokkit Command List')
      .setColor(msg.guild.member(client.user).highestRole.color)
      .setDescription(`${config.prefix}help - Find this command list
${config.prefix}info - returns info about the bot
${config.prefix}version - See what version the rokkit is.
${config.prefix}ping - Bot replies 'Pong!' with the time taken to send it
${config.prefix}say [Message] - Bot will repeat the message given
${config.prefix}hello - Bot will say 'Hello!'
${config.prefix}goodbye - Bot will say 'Goodbye!'
${config.prefix}avatar - Bot will post your avatar in chat
${config.prefix}roll - Bot will roll a six sided dice
${config.prefix}8ball [Question] - The magic 8 ball will answer your question
${config.prefix}coinflip - Bot will flip a British £1 Sterling
${config.prefix}how-old - See how old your account is in days
${config.prefix}profile - See some information about yourself and your public profile on the server
${config.prefix}ssd-invite - Bot will give an invite link to the Soviet Space Dog discord
${config.prefix}coming-soon - Bot will tell you what is being added to Rokkit in the next updates`)
      .setThumbnail(`${client.users.get('284894725998379019').avatarURL.replace('.jpg', '.png')}`))
  }

  if (command === 'info') {
    msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle(`Rokkit v${require('./package.json').version} Info`)
      .setColor(msg.guild.member(client.user).highestRole.color)
      .setFooter('Bot created by Samazer - 25/02/2017', `${client.users.get('153175577040257025').avatarURL.replace('.jpg', '.png')}`)
      .setDescription(`Hello I am Rokkit, I am a multipurpose bot made for the Soviet Space Dog discord server.
If you would like to report a bug please mention Samazer in the discord.
You can find a list of commands with ${config.prefix}help.`)
      )
  }

  if (command === 'profile') {
    let isBot = msg.author.bot ? 'is' : 'is not'
    msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle(`${msg.author.username}\'s profile`)
      .setThumbnail(msg.author.avatarURL.replace('.jpg', '.png'))
      .setColor(msg.guild.member(client.user).highestRole.color)
      .setFooter('Bot created by Samazer - 25/02/2017', `${client.users.get('153175577040257025').avatarURL.replace('.jpg', '.png')}`)
      .setDescription(`Account created on ${moment(msg.author.createdTimestamp).format('Do, MMM YYYY [at] h:mm a')}
      ${msg.author.username}\'s discriminator is *#${msg.author.discriminator}*
      ${msg.author.username} *${isBot}* a bot
      ${msg.author.username}\'s status is **${msg.author.presence.status}**`)
      )
  }

  if (command === 'avatar') {
    let attachment = msg.author.avatarURL.replace('.jpg', '.png')
    msg.channel.sendFile(attachment, 'avatar.png', `Here is your Avatar ${msg.author}`).catch(console.error);
  }

  if (command === 'say') {
    msg.channel.sendMessage(args.join(' '));
  }

  if (command === 'hello') {
    msg.channel.sendMessage('Hello!');
  } else

  if (command === 'goodbye') {
    msg.channel.sendMessage('Goodbye!');
  }

  if (command === 'invite') {
    msg.channel.sendMessage('Use this link to join the server,  https://discord.gg/DBZx7XS')
  }

  if (command === 'roll') {
    var dieSide = new Array();
    dieSide[1] = 'http://i.imgur.com/AM9em0O.png'
    dieSide[2] = 'http://i.imgur.com/2um583f.png'
    dieSide[3] = 'http://i.imgur.com/Fvt0zFI.png'
    dieSide[4] = 'http://i.imgur.com/0Z6BoIt.png'
    dieSide[5] = 'http://i.imgur.com/2RQe1Fv.png'
    dieSide[6] = 'http://i.imgur.com/oAhvXOz.png'
    var rand = 1 + Math.floor(Math.random() * 6);
    msg.channel.sendFile(dieSide[rand], null, `The die landed on ${rand.toString()}`)
  }

  if (command === '8ball') {
    var reply = new Array();
    reply[1] = 'It is certain';
    reply[2] = 'It is decidedly so';
    reply[3] = 'Without a doubt';
    reply[4] = 'Yes, definitely';
    reply[5] = 'You may rely on it';
    reply[6] = 'As I see it, yes';
    reply[7] = 'Most likely';
    reply[8] = 'Outlook good';
    reply[9] = 'Yes';
    reply[10] = 'Signs point to yes';
    reply[11] = 'Reply hazy try again';
    reply[12] = 'Ask again later';
    reply[13] = 'Better not tell you now';
    reply[14] = 'Cannot predict now';
    reply[15] = 'Concentrate and ask again';
    reply[16] = 'Don\'t count on it';
    reply[17] = 'My reply is no';
    reply[18] = 'My sources say no';
    reply[19] = 'Outlook not so good';
    reply[20] = 'Very doubtful';
    var rand = 1 + Math.floor(Math.random() * 20);
    msg.channel.sendMessage(reply[rand])
  }

  if (command === 'coinflip') {
    var side = new Array();
    side[1] = 'http://i.imgur.com/YZu6mOP.png';
    side[2] = 'http://i.imgur.com/nIsp2dY.png';
    var sidename = new Array();
    sidename[1] = 'heads';
    sidename[2] = 'tails';
    var rand = 1 + Math.floor(Math.random() * 2);
    msg.channel.sendFile(side[rand], null, `The coin landed on ${sidename[rand]}`)
  }

  if (command === 'ping') {
    msg.channel.sendMessage(`Pong! Time taken \`${Date.now() - msg.createdTimestamp} ms\``)
  }

  if (command === 'how-old') {
    msg.channel.sendMessage(`Your account was created ${Math.floor((Date.now() - msg.author.createdTimestamp) / (60*60*24*1000))} days ago`)
  }

  if (command === 'version') {
    msg.channel.sendMessage(`Rokkit is currently on version ${require('./package.json').version}`)
  }

  if (command === 'ssd-invite') {
    msg.channel.sendMessage(`Here is an invite to the Soviet Space Dog discord feel free to join us: https://discord.gg/DBZx7XS`)
  }

  if (command === 'coming-soon') {
    msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle('Coming soon to Rokkit')
      .setColor(msg.guild.member(client.user).highestRole.color)
      .setDescription(`1. Customisable Bio in >> profile

        2. Changeable prefix for different servers

        3. Reminders (Rokkit will take a reminder and a date and dm the user the reminder at whatever time they provide

        4. Role commands (manipulate roles, give, take, add, remove, new user roles, ect)

        5. cont. from \'4\' server ranks and levels with linked roles

        6. private room maker`)
      .setThumbnail(`${client.users.get('284894725998379019').avatarURL.replace('.jpg', '.png')}`))
  }

});

client.login(config.token);
