const { Telegraf } = require('telegraf')
const fetch = require('node-fetch')

require('dotenv').config()

const url = 'https://tgftp.nws.noaa.gov/data/observations/metar/stations/'

bot = new Telegraf(process.env.BOT_TOKEN)
bot.start(ctx => ctx.reply('Бот Жора предсказывает погоду.'))
bot.help(ctx => ctx.reply('Пишите: metar icao - для получения метара'))
bot.on('sticker', ctx => ctx.reply('✈️'))
bot.hears(/hi/i, ctx => ctx.reply('Hey there'))
bot.hears(/^metar/i, ctx => {
  fetch(url + ctx.message.text.slice(6, 10).toUpperCase() + '.TXT')
    .then(Response => Response.text())
    .then(Response => Response.match(/404 Not Found/) ? ctx.reply('Произошла ошибка.') : ctx.reply(Response))
})
bot.hears(/^mm/i, ctx => {
  const mm = ctx.message.text.slice(2, 6)
  ctx.reply(mm + ' mmHg, ' + Math.round(mm / 25.4 * 100) / 100 + ' inHg, ' + Math.round(mm * 1.333) + ' hPa.')
})
bot.hears(/^in/i, ctx => {
  const inhg = ctx.message.text.slice(2, 8)
  ctx.reply(inhg + ' inHg, ' + Math.round(inhg * 25.4) + ' mmHg, ' + Math.round(inhg * 33.864) + ' hPa.')
})
bot.hears(/^hpa/i, ctx => {
  const hpa = ctx.message.text.slice(3, 9)
  ctx.reply(hpa + ' hPa, ' + Math.round(hpa / 1.333) + ' mmHg, ' + Math.round(hpa / 33.864 * 100) / 100 + ' inHg.')
})
bot.hears(/^zulu/i, ctx => ctx.reply(Date().slice(16, 21)))
bot.launch()
