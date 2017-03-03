const config = require('../config.json');
module.exports = {

  func: (Client, msg, args) => {
    msg.channel.sendMessage(`Pong! Here's the WS Ping: \`${Math.round(msg.client.ping)} ms\` and HTTP Ping: \`${Date.now() - msg.createdTimestamp} ms\``);
  },
  args: 'There are no arguments for this command!',
  help: `Recieve a Pong! use: ${config.prefix}ping`,
}
