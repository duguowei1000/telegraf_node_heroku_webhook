// const Telegraf = require('telegraf')
const { Telegraf, session } = require('telegraf')
const express = require('express')
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.on('text', ({ replyWithHTML }) => replyWithHTML('<b>Hello</b>'))

// bot.telegram.setWebhook('https://----.localtunnel.me/secret-path')
// bot.telegram.setWebhook('https://----.localtunnel.me/secret-path')
bot.telegram.setWebhook('https://pure-refuge-83887.herokuapp.com/');

const app = express()
app.get('/', (req, res) => res.send('Hello World_yesyesyo!'))

app.use(bot.webhookCallback('/secret-path'))


// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 8000;
// }
// app.listen(port);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
})