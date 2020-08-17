const { Telegraf } = require('telegraf')
const fetch = require('node-fetch')
require('dotenv').config()

const url = 'https://tgftp.nws.noaa.gov/data/observations/metar/stations/'

let metar = ''


bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.hears('metar', (ctx) => ctx.reply('Work in progress...'))
bot.hears('unkl', (ctx) => {
  fetch(url + 'UNKL.TXT')
    .then(Response => Response.text())
    .then(Response => ctx.reply(Response))
})
bot.launch()

const getMetar = (icao) => {
  fetch(url + icao.toUpperCase() + '.TXT')
    .then(Response => Response.text())
    .then(Response => ctx.reply(Response))
}