const config = require('../config.json');
module.exports = {

  func: (Client, msg, args) => {
    var reply = new Array();
    reply[1] = 'It is certain';
    reply[2] = 'It is decidedly so';
    reply[3] = 'Without a doubt';
    reply[4] = 'Yes, definitely';
    reply[5] = 'You may rely on it';
    reply[6] = 'As I see it, yes';
    reply[7] = 'Most likely';
    reply[8] = 'Outlook good';
    reply[9] = 'Yes';
    reply[10] = 'Signs point to yes';
    reply[11] = 'Reply hazy try again';
    reply[12] = 'Ask again later';
    reply[13] = 'Better not tell you now';
    reply[14] = 'Cannot predict now';
    reply[15] = 'Concentrate and ask again';
    reply[16] = 'Don\'t count on it';
    reply[17] = 'My reply is no';
    reply[18] = 'My sources say no';
    reply[19] = 'Outlook not so good';
    reply[20] = 'Very doubtful';
    var rand = 1 + Math.floor(Math.random() * 20);
    msg.channel.sendMessage(reply[rand])
  },
  args: 'Ask a question in the arguments',
  help: `Ask the magic 8ball a yes/no question and it will see the answer, use: ${config.prefix}8ball [question]`,
}
