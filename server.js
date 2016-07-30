// server.js
var express        = require('express');  
var app            = express();  
var httpServer = require("http").createServer(app);  
var five = require("johnny-five");  
var io=require('socket.io')(httpServer);
 
var port = 3000; 
 
app.use(express.static(__dirname + '/public'));
 
app.get('/', function(req, res) {  
        res.sendFile(__dirname + '/public/index.html');
});
 
httpServer.listen(port);  
console.log('Server available at http://localhost:' + port);  
var rele1;
var rele2;
 
//Arduino board connection
 
var board = new five.Board();  
board.on("ready", function() {  
    console.log('Arduino connected');
    rele1 = new five.Relay(2);
	rele2 = new five.Relay(3);
});
 
//Socket connection handler
io.on('connection', function (socket) {  
        console.log(socket.id);
 
        socket.on('mover:direita', function (data) {
           rele1.on();
		   rele2.off();
           console.log('rele1 on , rele2 off');
        });
 
        socket.on('mover:esquerda', function (data) {
            rele1.off();
		    rele2.on();
            console.log('rele1 off , rele2 on');
 
        });
        socket.on('parar', function (data) {
            rele1.off();
            rele2.off();
            console.log('rele1 off , rele2 off');
 
        });
    });
 
console.log('Waiting for connection');