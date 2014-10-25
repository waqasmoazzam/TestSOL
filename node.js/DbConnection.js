var mongojs = require("mongojs");
var db = mongojs.connect("mongodb://article_reader:article_reader@ds063879.mongolab.com:63879/heroku_app29725784", ["articles"]);

function article(type){
	this.type = type;
}
var article = new article("SOLTV");
db.articles.find(article, function(err,articles){
	if(err || !articles.length) {
		console.log("data " + article.type + " not found.");
	} else {
		articles.forEach(function(a){
			console.log("data " + a.type+ "\n" +a.link + "\n" + a.imgUrl);
		});	
	}

});