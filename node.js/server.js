var http = require("http"),
    url = require("url"),
    path = require("path"),
    querystring = require("querystring"),
    utils = require("util"),
    zlib = require("zlib");


function start(route, handle, port) {
  function onRequest(request, response) {
    

  	if (request.method == 'POST') {
	    console.log("[200] " + request.method + " to " + request.url);
	    var fullBody = '';
	    
	    request.on('data', function(chunk) {
	      // append the current chunk of data to the fullBody variable
	      console.log(chunk.toString());
	      fullBody += chunk.toString();
	      
	    });
	    
		request.on('start', function() {
	    
	      // request ended -> do something with the data
	      
	      response.writeHead(200, "OK", {'Content-Type': 'text/html'});
	     
	    });

	    request.on('end', function() {
	    
	      // request ended -> do something with the data
	      
	      
	     response.write(fullBody);
	      
	      response.end();
	    });
    
  	}


    var pathname = url.parse(request.url).pathname;
    if(pathname == "/"){
    	pathname = "/index";
    }

    var ext = path.extname(pathname);
    if(!ext){
    	ext=".html";
    }
    
    route(handle, pathname, ext, response);
  }

http.createServer(onRequest).listen(port);
  console.log("Server has started listening on port " + port);
}

exports.start = start;