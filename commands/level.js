const config = require('../config.json');
const sql = require('sqlite');
sql.open('./score.sqlite');
module.exports = {

  func: (Client, msg, args) => {
    sql.get(`SELECT * FROM scores WHERE userId ='${msg.author.id}'`).then(row => {
      if (!row) return msg.reply('Your current level is 0');
      msg.reply(`Your current level is ${row.level}`);
    });
  },
  args: 'There are no arguments for this command!',
  help: `use: ${config.prefix}`,
}
