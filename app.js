var serialport = require("serialport");
var SerialPort = serialport.SerialPort;





var mySerial = new SerialPort("COM6", {
   baudRate: 9600,
  
   parser: serialport.parsers.readline("\n")
 });

 mySerial.on("open", function(){
 console.log("Porta aberta");
 });

 mySerial.on("data", function(dados){
 	console.log(dados);
 });