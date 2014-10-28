
var contentDir = "../html";

var extensions = {
    ".text" : "text/plain",
    ".html" : "text/html",
    ".css" : "text/css",
    ".json" : "application/json",
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
	
 	/*require("./dbController").articles(function(err, data){
	  	if(err){
	  		console.log("in admin error");
	  	}else {
	  		loadPage(contentDir + pathname + ext,  extensions[ext], response, data);
	  		console.log("in admin data: " + data.length);	
	  	}
  	
  	});*/
	loadPage(contentDir + pathname + ext,  extensions[ext], response);
}

//load other files such as css, js, images for the current page
function otherExt(pathname, ext, response){
	
	loadPage(contentDir + pathname, extensions[ext], response);	
}

function createNewEvent(pathname, ext, response, postData){
	// write the new event in the myDB by calling dbControlle. createNewEvent() 
	console.log("In handle create new event: " + postData);
}

function getAllArticles(pathname, ext, response){
	// write the new event in the myDB by calling dbControlle. getAllArticles() 
	console.log("In handle get all articles: ");
	

	require("./dbController").articles(function(err, data){
	  	if(err){
	  		console.log("in handle getAllArticles error");
	  		response.end("404 Articles not found");	
	  	}else {
	  		console.log("in handle get all articles success: " + data.length);	
	  		//response.writeHead(200, {"Content-Type": extensions[".json"]});
	  		response.writeHead(200, { 'Content-Type': 'application/json' });
			response.write(JSON.stringify(data));
			response.end();	
	  	}
  	
  	});
}


function loadPage(pathname, mimeType, response, data){
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

exports.createNewEvent = createNewEvent;
exports.getAllArticles = getAllArticles;
exports.index = index;
exports.admin = admin;
exports.otherExt = otherExt;