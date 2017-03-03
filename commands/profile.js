const Discord = require('discord.js');
const config = require('../config.json');
const moment = require('moment');
module.exports = {

  func: (Client, msg, args) => {
    if (!msg.mentions.users.size) return msg.channel.sendMessage(':warning: No mention found in message content');
    let dude = msg.guild.member(msg.mentions.users.first())
    let isBot = dude.user.bot ? 'bot' : 'user'
    msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle(`${dude.user.username}\'s profile`)
      .setThumbnail(dude.user.displayAvatarURL.replace('.jpg', '.png'))
      .setColor(msg.guild.member(Client.bot.user).highestRole.color)
      .setFooter('Bot created by Samazer - 25/02/2017', `${Client.bot.users.get('153175577040257025').displayAvatarURL.replace('.jpg', '.png')}`)
      .addField('Creation date:', `Account created on ${moment(dude.user.createdTimestamp).format('Do, MMM YYYY [at] h:mm a')}`, true)
      .addField('Account type:', `${isBot}`, true)
      .addField('Status:', `${dude.user.presence.status}`, true)
      .addField('Highest role:', `${dude.highestRole}`, true)
      .addField(`Joined ${msg.guild.name} on:`, `${moment(dude.joinedTimestamp).format('Do, MMM YYYY [at] h:mm a')}`, true)
      .addField(`Days on ${msg.guild.name}:`, `Has been a member for ${Math.floor((Date.now() - dude.joinedTimestamp) / (60*60*24*1000))} days`, true))
  },
  args: 'You should put the argument as a @mention of the user who\'s profile you want to see',
  help: `This command will display a profile of the specified user with some info about them, use: ${config.prefix}profile @Samazer#1625`,
}
