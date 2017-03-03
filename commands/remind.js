const config = require('../config.json');
const sherlock = require('sherlockjs');
const moment = require('moment');
module.exports = {

  func: (Client, msg, args) => {
    const s = sherlock.parse(msg.content);
    const relative = s.startDate.getTime() - Date.now();
    s.eventTitle = s.eventTitle.replace('>> remind me to', '');
    msg.channel.sendMessage(`I will remind you to ${s.eventTitle} ${moment().add(relative, 'ms').fromNow()}.`);
    setTimeout(() => {
      let final = `**REMINDER:** ${s.eventTitle}`;
      msg.author.sendMessage(final).catch(() => msg.channel.sendMessage(`${msg.author} ${final}`));
    }, relative);
  },
  args: 'Try writing this in the way you would ask someone in real life to remind you to do something',
  help: `This command will set a reminder and dm you the reminder at the time you specify, also it can get the time and subject from plain english so type the message in whatever format you like and it will most likely work, use: ${config.prefix}remind me to join the discord server at 4:00`,
}
