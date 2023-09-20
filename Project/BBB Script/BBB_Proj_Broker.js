//-----------------------------------------------------------------------------------------------
//
//
//
//
//                                      Device One (Laptop)
//
//
//
//
//
//-----------------------------------------------------------------------------------------------


/* Required modules */
const http = require('http');
const path = require('path');
var net = require('net');

/* Networking Variables */
//HOST is the IP for USB0 on BeagleBone
const HOST = '192.168.1.121';
const PORT1_1 = 4025; 

var url = 0;
var button = 0;


//API for laptop

/* Creates a web-server and facilitates API calls */
const server = http.createServer((req, res) => {
if (req.url === path.normalize('/')) {

res.end("Testing... Working");

//button status
} else if (req.url === path.normalize('/api/button/status')) {

console.log("Displaying to client:" + button);
res.end((button).toString());

//url status
} else if (req.url === path.normalize('/api/url/status')) {

console.log("Displaying to client:" + url);
res.end((url).toString());

}else {

/* Page not found */
res.writeHead(404, { 'Content-Type': 'text/plain' });
res.end("this page doesn't exist");

}
});

/* Start the http server. Non-blocking. */
server.listen(PORT1_1,HOST);


/**** Edit this file to integrate your Temperature Sensing code ****/

/* Required modules */


//TCP server for laptop to send data to BBB

var PORT1_2 = 4020;

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {
  // We have a connection - a socket object is assigned to the connection automatically
 console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
  // Add a 'data' event handler to this instance of socket
  sock.on('data', function(data) {
    console.log('DATA ' + sock.remoteAddress + ': ' + data);
    // Write the data back to the socket, the client will receive it as data from the server
    
    url = data;
    
    
    sock.write('You said "' + data + '"');
  });
  // Add a 'close' event handler to this instance of socket
 sock.on('close', function(data) {
   console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
 });

}).listen(PORT1_2, HOST);

console.log('Server listening on ' + HOST +':'+ PORT1_2);



//-----------------------------------------------------------------------------------------------
//
//
//
//
//                                      Device Two (PI)
//
//
//
//
//
//-----------------------------------------------------------------------------------------------


/* Networking Variables */
//HOST2 is the eth0 IP on the BBB going from BBB to PI
const HOST2 = '192.168.1.121'; //<<this IP needs to be changed every time you hook up the ethernet
const PORT2_1 = 9105; 



/* Creates a web-server and facilitates API calls */
const server2 = http.createServer((req, res) => {
if (req.url === path.normalize('/')) {

res.end("Testing... Working");

//button status
} else if (req.url === path.normalize('/api/button/status')) {

console.log("Displaying to client:" + button);
res.end((button).toString());

//url status
} else if (req.url === path.normalize('/api/url/status')) {

console.log("Displaying to client:" + url);
res.end((url).toString());

}else {

/* Page not found */
res.writeHead(404, { 'Content-Type': 'text/plain' });
res.end("this page doesn't exist");

}
});

/* Start the http server. Non-blocking. */
server2.listen(PORT2_1,HOST2);


//TCP server for PI to send data to BBB

var PORT2_2 = 9055;

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {
  // We have a connection - a socket object is assigned to the connection automatically
 console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
  // Add a 'data' event handler to this instance of socket
  sock.on('data', function(data) {
    console.log('DATA ' + sock.remoteAddress + ': ' + data);
    // Write the data back to the socket, the client will receive it as data from the server
    
    button = data;
    
    sock.write('You said "' + data + '"');
  });
  // Add a 'close' event handler to this instance of socket
 sock.on('close', function(data) {
   console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
 });

}).listen(PORT2_2, HOST2);

console.log('Server listening on ' + HOST2 +':'+ PORT2_2);