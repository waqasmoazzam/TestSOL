


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
	loadPage(contentDir + pathname + ext,  extensions[ext], response);
}

//load other files such as css, js, images for the current page
function otherExt(pathname, ext, response){
	
	loadPage(contentDir + pathname, extensions[ext], response);	
}

function createNewEvent(pathname, ext, response, postBody){
	// write the new event in the myDB by calling dbControlle. createNewEvent() 
	console.log("In handle create new event");
	var dataArr = postBody.split("&");
	
	var jsonData = "{";
	
	for(var i = 0 ; i < dataArr.length ; i++){
		var values = dataArr[i].split("="); 
		jsonData += JSON.stringify(values[0]); 
		jsonData += ":";
		jsonData += JSON.stringify(values[1].split("+").join(" "));
		if(i != dataArr.length - 1){
			jsonData += ",";	
		}
	}
	jsonData +="}";
	jsonData = JSON.parse(jsonData);
	
	var eventName, eventType, articleIds = [];

	eventName = jsonData["eName"];
	eventType = jsonData["eType"];
	
	if(!eventType || eventType == ""){
		eventType = "EVENT";
	}
	
	var i = 1;
	
	console.log("length: " + jsonData.length);
	for(var prop in jsonData){
    	if(i > 2) {
    		articleIds.push(prop);	
    	}
    	i = i + 1;
    }

	
	var eventData = "{";
	eventData += JSON.stringify("eventName");
	eventData += ":";
	eventData += JSON.stringify(eventName);
	eventData += ",";
	eventData += JSON.stringify("eventType");
	eventData += ":";
	eventData += JSON.stringify(eventType);
	eventData += ",";
	eventData += JSON.stringify("articleIds");
	eventData += ":";
	eventData += "";
	eventData += JSON.stringify(articleIds);
	eventData += "";
	eventData += "}";
	eventData = JSON.parse(eventData);

	console.log(eventData);

	require("./dbController").createEvent(eventData, function(err, data){
	  	if(err || !data){
	  		console.log("in handle create new event error");
	  		response.end("Failed!. Refresh the page and try again.");	
	  	}else {
	  		console.log("in handle create new event success.");	
	  		//response.writeHead(200, { 'Content-Type': 'application/json' });
	  		response.writeHead(200, { 'Content-Type': extensions[".json"]});
			response.write(JSON.stringify(data));
			response.end();	
	  	}
  	
  	});

}

function getAllArticles(pathname, ext, response){
	// write the new event in the myDB by calling dbControlle. getAllArticles() 
	console.log("In handle get all articles");
	var searchCriteria = {};
	require("./dbController").articles(searchCriteria, function(err, data){
	  	if(err || !data){
	  		console.log("in handle getAllArticles error");
	  		response.end("404 Articles link is down. Try again later!");	
	  	}else {
	  		console.log("in handle get all articles success: " + data.length);	
	  		//response.writeHead(200, { 'Content-Type': 'application/json' });
	  		response.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });
			response.write(JSON.stringify(data));
			response.end();	
	  	}
  	
  	});
}

function getAllEvents(pathname, ext, response){
	// write the new event in the myDB by calling dbControlle. getAllArticles() 
	console.log("In handle get all events");
	
	require("./dbController").events(function(err, data){
	  	if(err || !data){
	  		console.log("in handle getAllEvents error");
	  		response.end("404 Events link is down. Try again later!");	
	  	}else {
	  		console.log("in handle get all events success: " + data.length);	
	  		//response.writeHead(200, { 'Content-Type': 'application/json' });
	  		response.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });
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
exports.getAllEvents = getAllEvents;
exports.index = index;
exports.admin = admin;
exports.otherExt = otherExt;