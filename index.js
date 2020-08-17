const { Telegraf } = require('telegraf')
require('dotenv').config()

const url = 'https://tgftp.nws.noaa.gov/data/observations/metar/stations/'


bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.hears('metar', (ctx) => ctx.reply('Work in progress...'))
bot.launch()

function getMetar(icao) {
  fetch(url + icao.toUpperCase() + '.TXT')
    .then(res => res.text())
}