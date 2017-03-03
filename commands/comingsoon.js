const config = require('../config.json');
const Discord = require('discord.js');
module.exports = {

  func: (Client, msg, args) => {
    msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle('Coming soon to Rokkit')
      .setColor(msg.guild.member(Client.bot.user).highestRole.color)
      .setDescription(`1. Customisable Bio in >> profile

        2. Changeable prefix for different servers

        3. Reminder managment

        4. Role commands (manipulate roles, give, take, add, remove, new user roles, ect)

        5. Private room maker

        6. Bugs found for Rokkit Bug Testers

        7. Add google/youtube/image/emoji/ect searching

        8. Message purging

        9. Weather updates

        10. make this command automated so i can add and remove todos in chat, or make global todos for everyone

        11. automated help menu

        12. define command

        13. translate command`)
      .setThumbnail(`${Client.bot.users.get('284894725998379019').avatarURL.replace('.jpg', '.png')}`))
  },
  args: 'There are no arguments for this command!',
  help: `use: ${config.prefix}comingsoon`,
}
