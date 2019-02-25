var io = require('socket.io').listen(3000);
io.on('connection', function (socket) {
    console.log('connected:', socket.client.id);
    socket.on('serverEvent', function (data) {
        console.log('new message from client:', data);
    });
    setInterval(function () {
        socket.emit('clientEvent', Math.random());
        console.log('message sent to the clients');
    }, 3000);
});
console.log("server listening on : 3000");