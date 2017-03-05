const config = require('../config.json');
const Discord = require('discord.js');
module.exports = {

  func: (client, msg, args) => {
    if (!msg.channel.permissionsFor(msg.member).hasPermission('MANAGE_MESSAGES')) return msg.channel.sendMessage(`:no_entry: **${msg.author.username}, you do not have permission to delete messages**`);
    if (!msg.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return msg.channel.sendMessage(`:warning: **${msg.author.username}, I don't have the permissions to delete messages**`)
    let msgcount = parseInt(args[0] || 1)
    msg.channel.fetchMessages({limit: msgcount+1})
      .then(msgs => msg.channel.bulkDelete(msgs))
  },
  args: 'number of messages',
  help: `Deletes the specified number of messages in a channel, use: ${config.prefix}prune 10`,
}
