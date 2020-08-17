const { Telegraf } = require('telegraf')
const express = require('express')
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
bot.start(ctx => ctx.reply('Бот Жора предсказывает погоду.'))
bot.help(ctx => ctx.reply('Пишите: metar icao - для получения метара'))
bot.on('sticker', ctx => ctx.reply('✈️'))
bot.hears(/[H,h]i/, ctx => ctx.reply('Hey there'))
bot.hears(/^[M,m]etar/, ctx => {
  fetch(url + ctx.message.text.slice(6, 10).toUpperCase() + '.TXT')
    .then(Response => Response.text())
    .then(Response => Response.match(/404 Not Found/) ? ctx.reply('Произошла ошибка.') : ctx.reply(Response))
})
bot.launch()
