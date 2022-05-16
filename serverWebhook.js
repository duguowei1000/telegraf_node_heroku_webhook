// const Telegraf = require('telegraf')
const { Telegraf, session } = require('telegraf')
const express = require('express')
const methodOverride = require("method-override")
const morgan = require("morgan");
require('dotenv').config()

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3600;
}
console.log("port:",port)

//Parameters
const botToken = process.env.BOT_TOKEN
const botSecret = process.env.BOT_SECRET
const DOMAIN = `https://telegraf-node-heroku-webhook.herokuapp.com/${botSecret}`

const app = express()

app.use(morgan("tiny"));
app.use(methodOverride("_method")); //put Delete
app.use(express.urlencoded({ extended: false })); //Parse URL-encoded bodies
app.use(express.json())

//BOT
const bot = new Telegraf(botToken)
// bot.on('text', ({ replyWithHTML }) => replyWithHTML('<b>Hello</b>'))
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker,yooloo'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

// bot.launch({
//   webhook: {
//     domain: 'https://telegraf-node-heroku-webhook.herokuapp.com',
//     port: 8443
//   }
// })


// bot.telegram.setWebhook('https://----.localtunnel.me/secret-path')
bot.telegram.setWebhook(`${DOMAIN}`).then(() => {
  console.log(`webhook is set on: ${DOMAIN}`)
})
// bot.startWebhook(`/${botToken}`, null, 443)
// require('https')
//   .createServer(//tlsOptions,
//      bot.webhookCallback(`/${botToken}`))
//   .listen(8443)

/////////////////////////////////////////////////////////////////////////


app.get('/', (req, res) => res.send('Hello World_yesyesyo!'))


app.post(`/`, (req, res) => {
  res.json(req.body);
   return bot.handleUpdate(req.body, res)
})

//async await
app.post(`/${botSecret}`, (req, res) => {
  
  // try {
    // res.json({ "hi": "bye"  });
    bot.handleUpdate(req.body, res)
    // .finally(() => {
    //   res.send('success')
    // })
    res.json({ message: req.body });
  // } catch (error) {
    // res.status(400).json({ error: error.message });
  //}

});

app.use(bot.webhookCallback(`/${botSecret}`)) //must be at the end
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
// app.use(bot.webhookCallback('/secret-path'))
// app.listen(port)