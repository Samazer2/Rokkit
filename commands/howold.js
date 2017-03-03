const config = require('../config.json');
module.exports = {

  func: (Client, msg, args) => {
    msg.channel.sendMessage(`Your account was created ${Math.floor((Date.now() - msg.author.createdTimestamp) / (60*60*24*1000))} days ago`)
  },
  args: 'There are no arguments for this command!',
  help: `This command will display how old your account is in days, use: ${config.prefix}howold`,
}
