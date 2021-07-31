var http = require('http');
/*
http.createServer method takes a function as an argument; that
function will be invoked every time an HTTP request is made.
program just sets the content type to plaintext and sends the string “Hello world!”
*/
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('response ends with this message');
}).listen(3000);
console.log('server started on localhost 3000');



