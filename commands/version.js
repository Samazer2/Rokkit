const config = require('../config.json');
module.exports = {

  func: (client, msg, args) => {
    msg.channel.sendMessage(`Rokkit is currently on version ${require('../package.json').version}`)
  },
  args: 'There are no arguments for this command!',
  help: `This command will display the current version of Rokkit, use: ${config.prefix}version`,
}
