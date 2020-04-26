// const io = require('socket.io')(3000);

// io.on('connection', socket => {
//     socket.emit('chat-message', 'Bem vindo ao chat')
// })
//----------------------------------------------------------------------------------------------------

const express = require('express')
const path = require('path')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

let arrayMsg = []

app.use('/', (req, res) => {
    res.render('index.html')
})

io.on('connection', socket => {
    console.log('Socket conectado: ', socket.id);

    socket.on('sendMsg', info => {
        console.log(info);
        arrayMsg.push(info)

        socket.broadcast.emit('msgRecebida', info)
    })
})

server.listen(80)