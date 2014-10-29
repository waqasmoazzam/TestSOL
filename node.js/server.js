var http = require("http"),
    url = require("url"),
    path = require("path");


function start(route, handle, port) {
  function onRequest(request, response) {

  	
    var pathname = url.parse(request.url).pathname;
    if(pathname == "/"){
    	pathname = "/index";
    }

    var ext = path.extname(pathname);
    if(!ext){
    	ext=".html";
    }
    if (request.method == 'POST') {
	    console.log("[200] " + request.method + " to " + request.url);
	    var postBody = '';
	    
	    request.on('data', function(chunk) {
	      // append the current chunk of data to the postBody variable
	      postBody += chunk.toString();
	      
	    });
		request.on('start', function() {
	      
	      //response.writeHead(200, "OK", {'Content-Type': 'application/json'});
	     
	    });
		request.on('end', function() {
	     route(handle, pathname, ext, response, postBody);
	     // handle["/createNewEvent"](postBody);
	     //response.write(postBody);
	      //response.end();
	    });
    
  	} else {
  		route(handle, pathname, ext, response);	
  	}
  }

http.createServer(onRequest).listen(port);
  console.log("Server has started listening on port " + port);
  require("./dbController").connect();
}

exports.start = start;

