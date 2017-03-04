const config = require('../config.json');
module.exports = {

  func: (client, msg, args, config) => {
    let attachment = msg.author.displayAvatarURL.replace('.jpg', '.png')
    msg.channel.sendFile(attachment, 'avatar.png', `Here is your Avatar ${msg.author}`)
  },
  args: 'There are no arguments for this command!',
  help: `This command will upload a .png of your avatar, use: ${config.prefix}avatar`,
}
