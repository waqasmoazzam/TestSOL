
var mongojs = require("mongojs");
var articlesDB, myDB;

function article(type){
	this.type = type;
}



var article = new article("SOLTV");

function connect(){
	if(!articlesDB){
		console.log("connecting for articles:");
		articlesDB = mongojs.connect("mongodb://article_reader:article_reader@ds063879.mongolab.com:63879/heroku_app29725784", ["articles"]);
	}
	if(!myDB){
		console.log("connecting for events");
		myDB = mongojs.connect(" mongodb://waqasmoazzam:123abc123@ds039960.mongolab.com:39960/test_sol", ["events"]);	
	}
	
	
}

function getAllArticles(callback){
	connect();
	articlesDB.articles.find(function(err,articlesData){
		console.log(articlesData.length);	
		if(err || !articlesData.length) {
			console.log("in get all articles db error");	
			callback(err);
		} else {
			console.log("in get all articles db success");	
			callback(err, articlesData);
		}
	});	
}

function getArticle(articleId, callback){
	connect();
	articlesDB.articles.find({_id:mongojs.ObjectId(articleId)}, function(err,singleArticleData){
		if(err ) {
			callback(err, null);
		} else {
			callback(err, singleArticleData);
		}
	});	
}



function getAllEvents(callback){
	connect();
	myDB.events.find(function(err,eventsData){
		
		if(err || !eventsData.length) {
			callback(err, null);
		} else {
			callback(err, eventsData);
		}
	});	
}

function createNewEvent(event){
	connect();

}


exports.connect = connect;
exports.articles = getAllArticles;
exports.article = getArticle;
exports.events = getAllEvents;



