const Discord = require('discord.js');
const config = require('../config.json');
module.exports = {

  func: (Client, msg, args) => {
    msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle('Rokkit Command List')
      .setColor(msg.guild.member(Client.bot.user).highestRole.color)
      .setDescription(`${config.prefix}help
${config.prefix}info
${config.prefix}version
${config.prefix}ping
${config.prefix}say
${config.prefix}hello
${config.prefix}goodbye
${config.prefix}avatar
${config.prefix}roll
${config.prefix}8ball
${config.prefix}coinflip
${config.prefix}how-old
${config.prefix}profile
${config.prefix}ssd-invite
${config.prefix}coming-soon
${config.prefix}github
${config.prefix}points
${config.prefix}level
${config.prefix}remind`)
      .setThumbnail(`${Client.bot.users.get('284894725998379019').avatarURL.replace('.jpg', '.png')}`)
      .setFooter('Type \'-help\' after any of these commands for more info and \'args\' for the arguments'))
  },
  args: 'There are no arguments for this command!',
  help: 'help help help help help help help',

}
