const superagent = require('superagent')
const key = require('../config.json').apikey

module.exports = {

  func: (client, msg, args) => {

    msgcontent = args[0].toString()
    longUrl = msgcontent.replace(/<|>/g, '')
    superagent.post(`https://www.googleapis.com/urlshortener/v1/url?key=${key}`)
    .set({ 'Content-Type': 'application/json' })
    .send({ longUrl })
    .then(res => res.body.id)
    .then(link => msg.channel.sendMessage(link))
  },
  args: 'URL',
  help: 'Shorten a url with goo.gl',
}
