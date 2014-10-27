var http = require("http"),
    url = require("url"),
    path = require("path");

function start(route, handle, port) {
  function onRequest(request, response) {
    
    var pathname = url.parse(request.url).pathname;

    if(pathname == "/"){
    	pathname = "/index.html";
    }

    var ext = path.extname(pathname);
    console.log(pathname);
    
    route(handle, pathname, ext, response);
  }

http.createServer(onRequest).listen(port);
  console.log("Server has started listening on port " + port);
}

exports.start = start;