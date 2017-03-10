const config = require('../config.json');
const Discord = require('discord.js');
module.exports = {

  func: (client, msg, args) => {
    msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle('Coming soon to Rokkit')
      .setColor(msg.guild.member(client.user).highestRole.color)
      .setDescription(`Customisable Bio in >> profile

        Changeable prefix for different servers

        Private room maker

        Bugs found for Rokkit Bug Testers

        Add google/image/emoji/ect searching

        Weather updates

        make this command automated so i can add and remove todos in chat, or make global todos for everyone

        define command

        translate command

        fix reminder no time / subject`)
      .setThumbnail(`${client.users.get('284894725998379019').avatarURL.replace('.jpg', '.png')}`))
  },
  args: 'There are no arguments for this command!',
  help: `use: ${config.prefix}comingsoon`,
}
