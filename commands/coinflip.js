const config = require('../config.json');
module.exports = {

  func: (Client, msg, args) => {
    var side = new Array();
    side[1] = 'http://i.imgur.com/YZu6mOP.png';
    side[2] = 'http://i.imgur.com/nIsp2dY.png';
    var sidename = new Array();
    sidename[1] = 'heads';
    sidename[2] = 'tails';
    var rand = 1 + Math.floor(Math.random() * 2);
    msg.channel.sendFile(side[rand], null, `The coin landed on ${sidename[rand]}`)
  },
  args: 'There are no arguments for this command!',
  help: `The bot will flip a coin and get a random result, use: ${config.prefix}coinflip`,
}
