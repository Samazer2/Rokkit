const config = require('../config.json');
const Discord = require('discord.js');
module.exports = {

  func: (client, msg, args) => {
    if (!msg.channel.permissionsFor(msg.member).hasPermission('BAN_MEMBERS')) return msg.channel.sendMessage(`:no_entry: **${msg.author.username}, you do not have permission to ban members**`);
    if (!msg.mentions.users.size) return msg.channel.sendMessage(`:warning: **${msg.author.username}, you must mention a user to ban**`)
    if (args.length < 2) return msg.channel.sendMessage(`:warning: **${msg.author.username}, you must provide a reason for banning this user**`)
    let chump = msg.guild.member(msg.mentions.users.first())
    if (!chump) return msg.channel.sendMessage(`:warning: **${msg.author.username}, you must enter a valid user**`)
    if (!msg.guild.member(client.user).hasPermission('BAN_MEMBERS')) return msg.channel.sendMessage(`:warning: **${msg.author.username}, I don't have the permissions to ban users**`);

    chump.ban().then(member => {
      msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('#ff0000')
      .setDescription(`**${chump.user.username} was successfully banned from ${msg.guild.name}**`))
    })
    if (msg.guild.id !== '283971348336738314') return;
    args.splice(args.indexOf(`<@${chump.id}>`), 1)
    var reason = args.join(' ')
    msg.guild.channels.get('287789331710607360').sendEmbed(new Discord.RichEmbed()
    .setDescription(`**Member:** ${chump.user.username}#${chump.user.discriminator}
      **Action:** Banned
      **Reason:** ${reason}`)
    .setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL.replace('.jpg', '.png'))
    .setColor('#ff0000')
    .setTimestamp())
  },
  args: '@user, reason',
  help: `Use this command to ban users from the server, use: ${config.prefix}ban @user reason`,
}
