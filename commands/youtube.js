const search = require('youtube-search');
const apikey = require('../config.json').apikey

module.exports = {

  func: (client, msg, args) => {
    if (args.length < 1) return msg.channel.sendMessage(`:warning: **${msg.author.username}, you must provide arguments**`);
    msgcontent = ''
    for (i = 0; i < args.length; i++) {
      msgcontent += (args[i]+' ')
    }

    var opts = {
      maxResults: 1,
      key: apikey
    };

    search(msgcontent, opts, function(err, results) {
      if(err) return console.log(err);

    msg.channel.sendMessage(`:tv: **I found** ***\'${results[0].title}\'*** **| ${results[0].link} **`)
    });
  },
  args: '<what you want to search for>',
  help: 'Search youtube for a video by providing a term',
}
