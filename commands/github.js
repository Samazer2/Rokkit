const config = require('../config.json');
module.exports = {

  func: (Client, msg, args) => {
    msg.channel.sendMessage(`Here is the GitHub repository https://github.com/Samazer2/Rokkit`)
  },
  args: 'There are no arguments for this command!',
  help: `This command will display Rokkit\'s repository on github, use: ${config.prefix}github`,
}
