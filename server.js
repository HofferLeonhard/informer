var http = require('http');
var fs = require('fs');
const PORT = process.env.PORT||5000;
var clients = {};

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket, pseudo) {
    clients[socket.request.connection.remoteAddress] = {ip: socket.request.connection.remoteAddress, family: socket.request.connection.remoteFamily, port: socket.request.connection.remotePort};

    // Quand un client se connecte, on lui envoie un message
    socket.emit('message', {type: "user connected", content: "Welcome, you're now connected to the server"});


    // Dès qu'on reçoit un "message" (clic sur le bouton), on le note dans la console
    socket.on('message', function (message) {
       
       if(message.type == "get all users"){
            socket.emit('message', {type: "get all users", content: clients});
       }

       if(message.type == "delete all users"){
            socket.broadcast.emit('message', {type: "remise à zéro"});
       }

    }); 
});


server.listen(PORT);
console.log("Server listening on port : "+PORT);