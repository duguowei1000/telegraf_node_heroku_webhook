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
app.use(express.urlencoded({ extended: false })); //Parse URL-encoded bodies
app.use(express.json())




app.get('/', (req, res) => res.send('Hello World_yesyesyo!'))


app.post(`/`, (req, res) => {
  res.json(req.body);
   return bot.handleUpdate(req.body, res)
})

//async await
app.post("/5374559077:AAHKc2q5RQXLZooleik7FB6K_rakARwZWd8", (req, res) => {
  
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

app.use(bot.webhookCallback(`/5374559077:AAHKc2q5RQXLZooleik7FB6K_rakARwZWd8`)) //must be at the end
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
// app.use(bot.webhookCallback('/secret-path'))
// app.listen(port)