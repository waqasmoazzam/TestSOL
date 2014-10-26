function index(response) {
  console.log("Request handler 'index' was called.");
  loadPage("../html/index.html", response);
}

function admin(response) {
  console.log("Request handler 'admin' was called.");
  loadPage("../html/admin.html", response);
}

function loadPage(pagePath, response){
	require("fs").readFile(pagePath, function (err, htmlData) {
		   	if (err) {
		        throw err; 
		    } 
		    console.log("loading: " + pagePath);
			response.writeHead(200, {"Content-Type": "text/html"});
  			response.write(htmlData);
  			response.end();
	});
}

exports.index = index;
exports.admin = admin;