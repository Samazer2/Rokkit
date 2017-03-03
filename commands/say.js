const config = require('../config.json');
module.exports = {

  func: (Client, msg, args) => {
    msg.channel.sendMessage(args.join(' '));
  },
  args: 'There are no arguments for this command!',
  help: `This command will make Rokkit repeat whatever is entered after >> say, use: ${config.prefix}say [message]`,
}
