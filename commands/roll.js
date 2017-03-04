const config = require('../config.json');
module.exports = {

  func: (client, msg, args) => {
    var dieSide = new Array();
    dieSide[1] = 'http://i.imgur.com/AM9em0O.png'
    dieSide[2] = 'http://i.imgur.com/2um583f.png'
    dieSide[3] = 'http://i.imgur.com/Fvt0zFI.png'
    dieSide[4] = 'http://i.imgur.com/0Z6BoIt.png'
    dieSide[5] = 'http://i.imgur.com/2RQe1Fv.png'
    dieSide[6] = 'http://i.imgur.com/oAhvXOz.png'
    var rand = 1 + Math.floor(Math.random() * 6);
    msg.channel.sendFile(dieSide[rand], null, `The die landed on ${rand.toString()}`)
  },
  args: 'There are no arguments for this command!',
  help: `Roll a die to land on a random side, use: ${config.prefix}roll`,
}
