const express = require('express')
const app = express()
const methodOverride = require('method-override')
const PORT = 3003 || process.env.PORT
const blogController = require('./controllers/blog.js')
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

const cors = require('cors')

const whitelist = ['http://localhost:3000', 'https://project-finder-team-front.herokuapp.com/']

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

mongoose.connect(MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true})
mongoose.connection.on('error', error => { console.log(error.message + 'Mongo running properly?')})
mongoose.connection.on('disconnected', ()=> console.log('Mongoose Disconnected'))
mongoose.connection.once('open', () => {console.log('Mongoose Connected')})

app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(methodOverride('_method'))
app.use('/blogs', blogController)


app.listen(PORT, ()=> {
    console.log('Everything is going according to plan at port: ', PORT)
})
