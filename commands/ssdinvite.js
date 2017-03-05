const config = require('../config.json');
module.exports = {

  func: (client, msg, args) => {
    msg.channel.sendMessage('Use this link to join the server,  https://discord.gg/DBZx7XS')
  },
  args: 'There are no arguments for this command!',
  help: `This command will post an invite link for the ssd server, use: ${config.prefix}ssdinvite`,
}
