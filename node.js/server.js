// reference the http module so we can create a webserver
var http = require("http");
var fs = require("fs");

fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err; 
    }

// create a server
http.createServer(function(req, res) {
    // on every request, we'll output 'Hello world'
    response.setHeader("Content-Type", "text/html");
    
}).listen(3000);

