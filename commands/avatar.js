const config = require('../config.json');
module.exports = {

  func: (client, msg, args) => {
    if (msg.mentions.users.size > 0) {
      var attachment = msg.guild.member(msg.mentions.users.first()).user.displayAvatarURL.replace('.jpg', '.png')
      var reply = `Here is ${msg.guild.member(msg.mentions.users.first()).user.username}\'s Avatar`
    }
    else {
      var attachment = msg.author.displayAvatarURL.replace('.jpg', '.png')
      var reply = `Here is your Avatar ${msg.author}`
    }
    msg.channel.sendFile(attachment, 'avatar.png', reply)
  },
  args: 'Add a mention at the end to get another users avatar',
  help: `This command will upload a .png of your avatar, use: ${config.prefix}avatar`,
}
