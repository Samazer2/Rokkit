module.exports = {

  func: (client, msg, args) => {
    msg.channel.sendMessage(`This is a test!`)
  },
  args: 'There are no arguments for this command!',
  help: `Test command`,
}
