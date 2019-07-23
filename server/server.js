const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')
const model = require('./model')
const Chat = model.getModel('chat')
const path = require('path')

// 新建app
const app = express()

// socket.io work with express
const server = require('http').createServer(app)
const io = require('socket.io')(server)
io.on('connection', function (socket) {
  socket.on('sendmsg', function (data) {
    const {from, to, msg} = data
    const chatid = [from, to].sort().join('_')
    Chat.create({chatid, from, to, content: msg}, function (err, doc) { 
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })
})

app.use(cookieParser())
app.use(bodyParser())
app.use('/user',userRouter )
app.use(function (req, res, next) { 
  if (req.url.startsWith('/user/') || req.url.startsWith('/static')) {
    return next()
  }
  return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build')))

server.listen(9093, function (params) {
  console.log(`
  Connecting to mongo host...
  [...]
  [......]
  [.........] done !
  connect success !
  node app start at port --- localhost:9093
  `)
})