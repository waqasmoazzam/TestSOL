// reference the http module so we can create a webserver
var http = require("http");
var fs = require("fs");
var htmlData;
var pagePath="../html/404.html";


// create a server
	http.createServer(function(req, res) {
	    // on every request, we'll output 'Hello world'
	    if(req.url=='/index.html' || req.url=='/') {
			pagePath = "../html/index.html";
		}

		fs.readFile(pagePath, function (err, htmlData) {
		    	if (err) {
		    		res.statusCode = 404;
		        	throw err; 
		    	} else {
		    		res.statusCode = 200;
		    	}
				res.setHeader("Content-Type", "text/html");
	    		res.write(htmlData);
	    		res.end();
			});

	}).listen(3000);

