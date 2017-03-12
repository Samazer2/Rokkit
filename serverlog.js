const Discord = require('discord.js');
const moment = require('moment');
module.exports = {

  log: (msg, client) => {
    if (msg.channel.type === 'dm' || msg.channel.type === 'group') return;
    if (msg.guild.id !== '283971348336738314') return;
    if (msg.channel.id === '287632630940172289' || msg.channel.id === '284381476860985346' || msg.channel.id === '287245026747219968') return;
    if (msg.embeds.length > 0) return msg.guild.channels.get('287632630940172289').sendMessage(`${msg.author.username} sent an embed in #${msg.channel.name}`);

    msg.guild.channels.get('287632630940172289').sendEmbed(new Discord.RichEmbed()
    .setDescription(msg.content)
    .setAuthor(`${msg.author.username}#${msg.author.discriminator} - ${msg.author.id}`, msg.author.displayAvatarURL.replace('.jpg', '.png'))
    .setTitle(`#${msg.channel.name}`)
    .setColor(msg.member.highestRole.color)
    .setFooter(`Message ID: ${msg.id}`)
    .setTimestamp())

    let attachmentsList = msg.attachments.array()
    let attachmentsStr = ''
    if (attachmentsList.length > 0) {
      for (i = 0; i < attachmentsList.length; i++) {
        attachmentsStr += (attachmentsList[i].url+'\n')
      }
      msg.guild.channels.get('287632630940172289').sendMessage(`**${msg.author.username} also sent these attachments: **`+attachmentsStr)
    }

    /*if (msg.embeds.length > 0) {
      msg.guild.channels.get('287632630940172289').sendMessage('**The user also sent an embed: **')
      msg.guild.channels.get('287632630940172289').sendEmbed(new Discord.RichEmbed()
      .setAuthor(msg.embeds[0].author)
      .setColor(msg.embeds[0].color)
      .setDescription(msg.embeds[0].description)
      .setFooter(msg.embeds[0].footer)
      .setThumbnail(msg.embeds[0].thumbnail)
      .setTitle(msg.embeds[0].title)
      .setURL(msg.embeds[0].url))
    }*/
  }
}
