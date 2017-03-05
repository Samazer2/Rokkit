const config = require('../config.json');
const Table = require('cli-table2');
module.exports = {

  func: (client, msg, args) => {
    
    var table = new Table({
           head: ['Position', 'Name', 'Points', 'Level']
        , style: {
            head: []    //disable colors in header cells
          , border: []  //disable colors for the border
        }
        , colWidths: []
      });

      table.push(
          ['1', 'Testing something cool', 'samazer', '7 minutes ago']
        , ['2', 'Testing something cool', 'samazer', '8 minutes ago']
        , ['3', 'Testing something cool', 'samazer', '8 minutes ago']
        , ['4', 'Testing something cool', 'samazer', '8 minutes ago']
        , ['5', 'Testing something cool', 'samazer', '8 minutes ago']
      );
    msg.channel.sendMessage(`\`\`\`${table.toString()}\`\`\``)
  },
  args: ' ',
  help: ` `,
}
