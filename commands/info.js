const Discord = require('discord.js');
const config = require('../config.json');
module.exports = {

  func: (client, msg, args) => {
    msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle(`Rokkit v${require('../package.json').version} Info`)
      .setColor(msg.guild.member(client.user).highestRole.color)
      .setFooter('Bot created by Samazer - 25/02/2017', `${client.users.get('153175577040257025').avatarURL.replace('.jpg', '.png')}`)
      .setDescription(`Hello I am Rokkit, I am a multipurpose bot made for the Soviet Space Dog discord server.
If you would like to report a bug please mention Samazer in the discord.
You can find a list of commands with ${config.prefix}help.`)
      )
  },
  args:'There are no arguments for this command!',
  help:`This command returns info about the bot, use: ${config.prefix}info`,
}
