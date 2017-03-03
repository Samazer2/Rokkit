const Discord = require('discord.js');
const config = require('../config.json');
const fs = require('fs');
module.exports = {

  func: (Client, msg, args) => {
    let commandsList = fs.readdirSync('./commands/');
    commandsList.sort()
    msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle('Rokkit Command List')
      .setColor(msg.guild.member(Client.bot.user).highestRole.color)
      .setDescription(`${config.prefix}${commandsList[0].replace('.js', '')}
${config.prefix}${commandsList[1].replace('.js', '')}
${config.prefix}${commandsList[2].replace('.js', '')}
${config.prefix}${commandsList[3].replace('.js', '')}
${config.prefix}${commandsList[4].replace('.js', '')}
${config.prefix}${commandsList[5].replace('.js', '')}
${config.prefix}${commandsList[6].replace('.js', '')}
${config.prefix}${commandsList[7].replace('.js', '')}
${config.prefix}${commandsList[8].replace('.js', '')}
${config.prefix}${commandsList[9].replace('.js', '')}
${config.prefix}${commandsList[10].replace('.js', '')}
${config.prefix}${commandsList[11].replace('.js', '')}
${config.prefix}${commandsList[12].replace('.js', '')}
${config.prefix}${commandsList[13].replace('.js', '')}
${config.prefix}${commandsList[14].replace('.js', '')}
${config.prefix}${commandsList[15].replace('.js', '')}
${config.prefix}${commandsList[16].replace('.js', '')}`)
      .setThumbnail(`${Client.bot.users.get('284894725998379019').avatarURL.replace('.jpg', '.png')}`)
      .setFooter('Type \'help\' after any of these commands for more info and \'args\' for the arguments'))
  },
  args: 'There are no arguments for this command!',
  help: 'help help help help help help help',

}
