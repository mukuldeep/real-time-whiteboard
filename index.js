const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/whiteboard.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('board activity', (msg) => {
    //console.log('message: ' + msg);
	io.emit('board activity', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});