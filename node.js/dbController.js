
var mongojs = require("mongojs");
var articlesDB, myDB;

function article(type){
	this.type = type;
}



var article = new article("SOLTV");

function connect(){
	if(!articlesDB){
		console.log("connecting for articles:");
		articlesDB = mongojs.connect("mongodb://article_reader:article_reader@ds033390.mongolab.com:33390/heroku_app31091945", ["articles"]);
		articlesDB.getCollectionNames(function(err, data){
			console.log("collection names: " + data);
		});
	}
	if(!myDB){
		console.log("connecting for events");
		myDB = mongojs.connect("mongodb://event_creator:event_creator@ds047440.mongolab.com:47440/test_sol", ["events"]);
		myDB.getCollectionNames(function(err, data){
			console.log("collection names: " + data);
		});

	}
	
	
}

function getAllArticles(searchCriteria, callback){
	
	if(searchCriteria == ""){
		searchCriteria ={};
	}

	articlesDB.articles.find(searchCriteria, function(err,articlesData){
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
	
	articlesDB.articles.find({_id:mongojs.ObjectId(articleId)}, function(err,singleArticleData){
		if(err ) {
			callback(err, null);
		} else {
			callback(err, singleArticleData);
		}
	});	
}



function getAllEvents(callback){
	
	myDB.events.find(function(err,eventsData){
		
		if(err || !eventsData.length) {
			callback(err, null);
		} else {
			callback(err, eventsData);
		}
	});	
}

function createNewEvent(eventData, callback){
	
	//db.collection.insert(docOrDocs, [callback])
	myDB.events.insert(eventData, function(err, data){
		if(err) {
			console.log("in db create new event error");	
			callback(err);
		} else {
			console.log("in db create new event success: " + data);	
			callback(err, data);
		}
	});

}


exports.connect = connect;
exports.articles = getAllArticles;
exports.article = getArticle;
exports.events = getAllEvents;
exports.createEvent = createNewEvent;



