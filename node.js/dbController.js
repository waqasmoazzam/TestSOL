
var mongojs = require("mongojs");
var articlesDB, myDB;

function connect(){
	
	if(!myDB){
		console.log("connecting to myDB");
		myDB = mongojs.connect("mongodb://event_creator:event_creator@ds047440.mongolab.com:47440/test_sol", ["events","articles"]);
		myDB.getCollectionNames(function(err, data){
			console.log("collection names: " + data);
		});

	}
	
	
}

function getAllArticles(searchCriteria, callback){
	
	if(searchCriteria == ""){
		searchCriteria ={};
	}

	myDB.articles.find(searchCriteria, function(err,articlesData){
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

function getArticles(articleIds, callback){
	var articleObjectIds = [];
	for(var i = 0 ; i < articleIds.length ; i++ ){
		articleObjectIds[i] = mongojs.ObjectId(articleIds[i]); 
	}
	myDB.articles.find({ _id: { $in : articleObjectIds } }, function(err,articlesData){
		if(err ) {
			callback(err, null);
		} else {
			callback(err, articlesData);
		}
	});	
}

function getEvent(eventId, callback){
	
	myDB.events.find({_id:mongojs.ObjectId(eventId)}, function(err,eventData){
		if(err ) {
			callback(err, null);
		} else {
			callback(err, eventData);
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
exports.fewArticles = getArticles;
exports.singleEvent = getEvent;
exports.events = getAllEvents;
exports.createEvent = createNewEvent;



