const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const redis = require("redis");
const client = redis.createClient();

const app = express()
const server = require('http').createServer(app)
const response = require('./src/helpers/responseStandard')
const APP_PORT = '8080'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())

// provide static file
app.use('/uploads', express.static('assets/uploads'))

const userRoute = require('./src/routes/user')
const authRoute = require('./src/routes/auth')
const refferalRoute = require('./src/routes/refferralCode')
const getRandomHeroRoute = require('./src/routes/getSingleRandomHero')

app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/refferal', refferalRoute)
app.use('/random', getRandomHeroRoute)

app.get('/', (req, res) => {
  return response(res, 'Backend is running', {}, 200, true)
})

client.on("error", function(error) {
  console.error(error);
});

server.listen(APP_PORT, () => {
  console.log('listening on port ' + APP_PORT)
})
