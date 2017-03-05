const Discord = require('discord.js');
const config = require('../config.json');
const fs = require('fs');
module.exports = {

  func: (client, msg, args) => {
    let commandsList = fs.readdirSync('./commands/');
    commandsList.sort()
    let desc = '';
    for (i = 0; i < commandsList.length; i++) {
      desc += (config.prefix + commandsList[i].replace('.js', '')+'\n')
    }
    msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle('Rokkit Command List')
      .setColor(msg.guild.member(client.user).highestRole.color)
      .setDescription(desc)
      .setThumbnail(`${client.users.get('284894725998379019').avatarURL.replace('.jpg', '.png')}`)
      .setFooter('Type \'help\' after any of these commands for more info and \'args\' for the arguments'))
  },
  args: 'There are no arguments for this command!',
  help: `Displays the command list, use: ${config.prefix}help`,

}
