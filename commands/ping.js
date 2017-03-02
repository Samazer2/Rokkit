module.exports = {

  func: (msg) => {
    msg.channel.sendMessage(`Pong! WS Ping: \`${Math.round(msg.client.ping)} ms\` | HTTP Ping: \`${Date.now() - msg.createdTimestamp} ms\``);
  },
  args: '',
  help: 'Recieve a Pong!',
}
