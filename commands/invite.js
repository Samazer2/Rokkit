const config = require('../config.json');
module.exports = {

  func: (client, msg, args) => {
    msg.channel.sendMessage('Use this link to get me on your server, https://discordapp.com/oauth2/authorize?client_id=284894725998379019&scope=bot&permissions=2146958463')
  },
  args: 'There are no arguments for this command!',
  help: `This command will post an invite link for rokkit, use: ${config.prefix}invite`,
}
