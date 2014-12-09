var http = require("http"),
    url = require("url"),
    path = require("path");


function start(route, handle, port) {
  function onRequest(request, response) {

  	
    var pathname = url.parse(request.url).pathname;
    
  if(pathname == "/favicon.ico"){
      return;
    }

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
	      postBody += chunk.toString();
	      
	    });

		request.on('end', function() {
	     route(handle, pathname, ext, response, postBody);
	     
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

