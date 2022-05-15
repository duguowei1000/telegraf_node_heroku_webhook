// const Telegraf = require('telegraf')
const { Telegraf, session } = require('telegraf')
const express = require('express')
require('dotenv').config()

const botToken = process.env.BOT_TOKEN
const port = process.env.PORT

const bot = new Telegraf(botToken)

bot.on('text', ({ replyWithHTML }) => replyWithHTML('<b>Hello</b>'))

// bot.telegram.setWebhook('https://----.localtunnel.me/secret-path')
bot.telegram.setWebhook(`https://telegraf-node-heroku-webhook.herokuapp.com/${botToken}`);


// Http webhook, for nginx/heroku users.
bot.startWebhook(`/${botToken}`, null, 5000)

const app = express()
app.get('/', (req, res) => res.send('Hello World_yesyesyo!'))


// app.use(bot.webhookCallback('/secret-path'))


// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 8000;
// }
// app.listen(port);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})