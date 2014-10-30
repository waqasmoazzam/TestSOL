function route(handle, pathname, ext, response, postBody) {
  if (typeof handle[pathname] == 'function') {
 	handle[pathname](pathname, ext, response, postBody);
  } else {
  	if(ext != ".html"){ // launch requesthandler for the supporting content for the current page such as css, javascript or images.
  		handle["otherExt"](pathname, ext, response);
  	} else {
	  	console.log("No request handler found for " + pathname);
	    response.writeHead(404, {"Content-Type": "text/html"});
	    response.write("404 Not found");
	    response.end();		
  	}
	
  }
}

exports.route = route;