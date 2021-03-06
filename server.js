const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const blogController = require('./controllers/blog.js')
require('dotenv').config()

const PORT = process.env.PORT || 3003

const mongoURI = process.env.MONGODBURI || 'mongodb://localhost:27017/blogs'

const whitelist = ['http://localhost:3000', 'https://project-finder-team-front.herokuapp.com/', 'https://project-finder-team-backend.herokuapp.com/']

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

mongoose.connect(mongoURI, {useUnifiedTopology: true, useNewUrlParser: true})
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
