var contentDir = "../html";

var extensions = {
    ".html" : "text/html",
    ".css" : "text/css",
    ".js" : "application/javascript",
    ".png" : "image/png",
    ".gif" : "image/gif",
    ".jpg" : "image/jpeg"
};


function index(pathname, ext, response) {
  //todo anything specific to index page
 

  loadPage(contentDir + pathname + ext,  extensions[ext], response);
}

function admin(pathname, ext, response) {
  //todo anything specific to admin page

  loadPage(contentDir + pathname + ext,  extensions[ext], response);
}

//load other files such as css, js, images for the current page
function otherExt(pathname, ext, response){
	
	loadPage(contentDir + pathname, extensions[ext], response);	
}


function loadPage(pathname, mimeType, response){
	require("fs").readFile(pathname, function (err, htmlData) {
		   	if (err) {
		       throw err; 
		    } else {
			    //console.log("loading: " + pathname);
				response.writeHead(200, {"Content-Type": mimeType});
	  			response.write(htmlData);
	  			response.end();	
		    }
		    
	});
}


function test(pathname, ext, response) {
  //todo anything specific to admin page

  loadPage(contentDir + pathname + ext,  extensions[ext], response);
}
exports.index = index;
exports.admin = admin;
exports.test = test;
exports.otherExt = otherExt;