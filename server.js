const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');

const isDevMode = process.env.NODE_ENV === 'development'
const nextApp = next({dev: isDevMode})
const nextHandler = nextApp.getRequestHandler();

io.on('connect', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
  
    socket.on('join', (room) => {
        console.log(`user joined room: ${room}`);
        socket.join(room);
    });

    socket.on('leave', (room) => {
        console.log(`user left room: ${room}`);
        socket.leave(room);
    });

    socket.on('chat message', (msg) => {
        console.log(`received message: ${msg} to ${socket.room}`);
        io.to('room1').emit('chat message', msg);
    });

    socket.emit('now', {
        message: 'Your are connect'
    })
})

nextApp.prepare().then(() => {
    app.get('*', (req, res) => {
        return nextHandler(req, res)
    })

    server.listen(3000, (err) => {
        if(err) throw err;
        console.log('> Ready on http://localhost:3000')
    })
})