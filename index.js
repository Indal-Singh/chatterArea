const { on } = require('events');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const users = [];

const port = 9420; // You can change this to any port you prefer

// Serve static files (e.g., HTML, CSS, JavaScript)
app.use(express.static(__dirname + '/public'));

// Define a route that responds with "Hello, World!" when accessed
app.get('/', (req, res) => {
  res.send('Hii This is ChattAreta By Indal Singh');
});

io.on('connection',(socket) => {
  socket.on('new-user-joined',uname => {
    users[socket.id]=uname
    socket.broadcast.emit('user-joined',uname);
  })

  socket.on('send',message => {
    socket.broadcast.emit('recived',{
      message:message,
      uname:users[socket.id]
    })
  })

  socket.on('disconnect',message => {
    socket.broadcast.emit('leave',users[socket.id])
    delete users[socket.id]
  })
})


// Start the server
server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
