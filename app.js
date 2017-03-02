const Discord = require('discord.js');
const client = new Discord.Client();
const sql = require('sqlite');
sql.open('./score.sqlite');
const config = require('./config.json');
const fs = require('fs');
const moment = require('moment');
const sherlock = require('sherlockjs');

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
  if (msg.channel.type === 'dm') return;

  sql.get(`SELECT * FROM scores WHERE userId ='${msg.author.id}'`).then(row => {
    if (!row) { // Can't find the row.
      sql.run('INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)', [msg.author.id, 1, 0]);
    } else { // Can find the row.
      let curLevel = Math.floor(0.1 * Math.sqrt(row.points + 1));
      if (curLevel > row.level) {
        row.level = curLevel;
        sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${msg.author.id}`);
        msg.reply(`You've leveled up to level **${curLevel}**! Congrats`);
      }
      sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${msg.author.id}`);
    }
  }).catch(() => {
    console.error;
    sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)').then(() => {
      sql.run('INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)', [msg.author.id, 1, 0]);
    });
  });

  if(!msg.content.startsWith(config.prefix)) return;
  const args = msg.content.substring(config.prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  try {
    let commandFile = require(`./commands/${command}.js`);
    command.func(client, msg, args)
  } catch (err) {
    console.error(err);
  }

  if (command === 'level') {
    sql.get(`SELECT * FROM scores WHERE userId ='${msg.author.id}'`).then(row => {
      if (!row) return msg.reply('Your current level is 0');
      msg.reply(`Your current level is ${row.level}`);
    });
  } else

  if (command === 'points') {
    sql.get(`SELECT * FROM scores WHERE userId ='${msg.author.id}'`).then(row => {
      if (!row) return msg.reply('you do not have any points yet!');
      msg.reply(`you currently have ${row.points} points!`);
    });
  }

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
${config.prefix}profile [@Mention]- See the mentioned users profile on the server
${config.prefix}ssd-invite - Bot will give an invite link to the Soviet Space Dog discord
${config.prefix}coming-soon - Bot will tell you what is being added to Rokkit in the next updates
${config.prefix}github - Bot will give a link to the Rokkit github repository
${config.prefix}points - Bot will show your current points on the server
${config.prefix}level - Bot will show your current level on the server`)
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
    if (!msg.mentions.users.size) return msg.channel.sendMessage('Error: No mention found in message content');
    let dude = msg.guild.member(msg.mentions.users.first())
    let isBot = dude.user.bot ? 'bot' : 'user'
    msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle(`${dude.user.username}\'s profile`)
      .setThumbnail(dude.user.avatarURL.replace('.jpg', '.png'))
      .setColor(msg.guild.member(client.user).highestRole.color)
      .setFooter('Bot created by Samazer - 25/02/2017', `${client.users.get('153175577040257025').avatarURL.replace('.jpg', '.png')}`)
      .addField('Creation date:', `Account created on ${moment(dude.user.createdTimestamp).format('Do, MMM YYYY [at] h:mm a')}`, true)
      .addField('Account type:', `${isBot}`, true)
      .addField('Status:', `${dude.user.presence.status}`, true)
      .addField('Highest role:', `${dude.highestRole}`, true)
      .addField(`Joined ${msg.guild.name} on:`, `${moment(dude.joinedTimestamp).format('Do, MMM YYYY [at] h:mm a')}`, true)
      .addField(`Days on ${msg.guild.name}:`, `Has been a member for ${Math.floor((Date.now() - dude.joinedTimestamp) / (60*60*24*1000))} days`, true))
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

        3. Reminder managment

        4. Role commands (manipulate roles, give, take, add, remove, new user roles, ect)

        5. Private room maker

        6. Bugs found for Rokkit Bug Testers

        7. Add google/youtube/image/emoji/ect searching

        8. Message purging

        9. Weather updates`)
      .setThumbnail(`${client.users.get('284894725998379019').avatarURL.replace('.jpg', '.png')}`))
  }

  if (command === 'github') {
    msg.channel.sendMessage(`Here is the GitHub repository https://github.com/Samazer2/Rokkit`)
  }

  if (command === 'remind') {
    const s = sherlock.parse(msg.content);
    const relative = s.startDate.getTime() - Date.now();
    s.eventTitle = s.eventTitle.replace('>> remind me to', '');
    msg.channel.sendMessage(`I will remind you to ${s.eventTitle} ${moment().add(relative, 'ms').fromNow()}.`);
    setTimeout(() => {
      let final = `**REMINDER:** ${s.eventTitle}`;
      msg.author.sendMessage(final).catch(() => msg.channel.sendMessage(`${msg.author} ${final}`));
    }, relative);
  }

});

client.login(config.token);
