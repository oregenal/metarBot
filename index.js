const { Telegraf } = require('telegraf')
const express = require('express')
// const { Composer } = require('micro-bot')
const fetch = require('node-fetch')

const expressApp = express()
require('dotenv').config()

const url = 'https://tgftp.nws.noaa.gov/data/observations/metar/stations/'

const port = process.env.PORT || 3000
expressApp.get('/', (req, res) => {
  res.send('Hello World!')
})
expressApp.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

bot = new Telegraf(process.env.BOT_TOKEN)
// bot = new Composer
bot.start(ctx => ctx.reply('Welcome'))
bot.help(ctx => ctx.reply('Send me a sticker'))
bot.on('sticker', ctx => ctx.reply('👍'))
bot.hears('hi', ctx => ctx.reply('Hey there'))
bot.hears('metar', ctx => ctx.reply('Work in progress...'))
bot.hears('unkl', ctx => {
  fetch(url + 'UNKL.TXT')
    .then(Response => Response.text())
    .then(Response => ctx.reply(Response))
})
bot.launch()
// module.exports = bot

const getMetar = (icao) => {
  fetch(url + icao.toUpperCase() + '.TXT')
    .then(Response => Response.text())
    .then(Response => ctx.reply(Response))
}