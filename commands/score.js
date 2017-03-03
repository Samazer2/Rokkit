const config = require('../config.json');
const sql = require('sqlite');
sql.open('./score.sqlite');
module.exports = {

  func: (Client, msg, args) => {
    if (args.includes('level')) {
        sql.get(`SELECT * FROM scores WHERE userId ='${msg.author.id}'`).then(row => {
          if (!row) return msg.reply('Your current level is 0');
          msg.reply(`Your current level is ${row.level}`);
        });
      }

      if (args.includes('points')) {
        sql.get(`SELECT * FROM scores WHERE userId ='${msg.author.id}'`).then(row => {
          if (!row) return msg.reply('you do not have any points yet!');
          msg.reply(`you currently have ${row.points} points!`);
        });
      }
  },
  onmsg: (msg) => {
    sql.get(`SELECT * FROM scores WHERE userId ='${msg.author.id}'`).then(row => {
      if (!row) { // Can't find the row.
        sql.run('INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)', [msg.author.id, 1, 0]);
      } else { // Can find the row.
        let curLevel = Math.floor(0.1 * Math.sqrt(row.points + 1));
        if (curLevel > row.level) {
          row.level = curLevel;
          sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${msg.author.id}`);
          msg.reply(`You've leveled up to level **${curLevel}**! Congrats`);
        }
        sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${msg.author.id}`);
      }
    }).catch(() => {
      console.error;
      sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)').then(() => {
        sql.run('INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)', [msg.author.id, 1, 0]);
      });
    });
  },
  args: 'There are no arguments for this command!',
  help: `use: ${config.prefix}`,
}
