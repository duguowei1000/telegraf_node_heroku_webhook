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

const botToken = process.env.BOT_TOKEN

const bot = new Telegraf(botToken)

const app = express()

app.use(morgan("tiny"));
app.use(methodOverride("_method")); //put Delete
app.use(express.urlencoded({ extended: false }));
app.use(express.json())




app.get('/', (req, res) => res.send('Hello World_yesyesyo!'))

app.use(bot.webhookCallback(`/aahk`))
app.post(`/`, (req, res) => {
  // console.log("req.body",req.body)
  // res.send("Ok");
  res.json({ message: req.body });
  // return bot.handleUpdate(req.body, res)
})

//async await
app.post("/aahk", (req, res) => {
  
  try {
    res.status(200).json({ message: req.body });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
// app.use(bot.webhookCallback('/secret-path'))
// app.listen(port)