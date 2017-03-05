const config = require('../config.json');
module.exports = {

  func: (client, msg, args) => {
    if (msg.mentions.users.size > 0) return msg.channel.sendMessage(`${msg.guild.member(msg.mentions.users.first()).user.username}\'s account was created ${Math.floor((Date.now() - msg.guild.member(msg.mentions.users.first()).user.createdTimestamp) / (60*60*24*1000))} days ago`)
    else return msg.channel.sendMessage(`Your account was created ${Math.floor((Date.now() - msg.author.createdTimestamp) / (60*60*24*1000))} days ago`)
  },
  args: 'Add a mention at the end to get another users account age',
  help: `This command will display how old your account is in days, use: ${config.prefix}howold`,
}
