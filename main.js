const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const ss = require('socket.io-stream');
const chunkedStream = require('chunked-stream');
const {Readable} = require('stream');
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/listen', (req, res) => {
    res.sendFile(__dirname + '/listen.html');
});
// Server-side code
io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('record', (data) => {
        io.emit('audio', data);
        console.log('data audio diterima')
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});