const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

var shoppingCart=[]

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(bodyParser.json())
app.listen(8080)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })

  app.get('/shop', (req, res) => {
   res.json(shoppingCart)
  })
  
  app.post('/shop', (req, res) => {  
   shoppingCart=req.body
   res.send('Success')
   })
  