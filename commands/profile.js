const Discord = require('discord.js');
const config = require('../config.json');
const moment = require('moment');
module.exports = {

  func: (client, msg, args) => {
    if (msg.mentions.users.size) var dude = msg.guild.member(msg.mentions.users.first())
    else var dude = msg.guild.member(msg.author)
    let isBot = dude.user.bot ? 'bot' : 'user'
    msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle(`${dude.user.username}\'s profile`)
      .setThumbnail(dude.user.displayAvatarURL.replace('.jpg', '.png'))
      .setColor(msg.guild.member(client.user).highestRole.color)
      .setFooter('Bot created by Samazer - 25/02/2017', `${client.users.get('153175577040257025').displayAvatarURL.replace('.jpg', '.png')}`)
      .addField('Creation date:', `Account created on ${moment(dude.user.createdTimestamp).format('Do, MMM YYYY [at] h:mm a')}`, true)
      .addField('Account type:', `${isBot}`, true)
      .addField('Status:', `${dude.user.presence.status}`, true)
      .addField('Highest role:', `${dude.highestRole}`, true)
      .addField(`Joined ${msg.guild.name} on:`, `${moment(dude.joinedTimestamp).format('Do, MMM YYYY [at] h:mm a')}`, true)
      .addField(`Days on ${msg.guild.name}:`, `Has been a member for ${Math.floor((Date.now() - dude.joinedTimestamp) / (60*60*24*1000))} days`, true))
  },
  args: 'Add a mention at the end to get another users profile',
  help: `This command will display a profile of the user with some info about them, use: ${config.prefix}profile`,
}
