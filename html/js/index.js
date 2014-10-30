$(document).ready(function() {
	makeAjaxCallForEvents();
} );

function makeAjaxCallForEvents(){
	console.log("In scroll ajax");
	$.ajax({
		url: "/getAllEvents",
		type: "GET",
		success: function(data){
			console.log(JSON.stringify(data));
			loadEvents(data);
		}
	} );
}

function loadEvents(data){
	console.log("in load content");

	for(var i = 0 ; i < data.length ; i++){
		//console.log(data[i]._id);
		$("#sidebar-wrapper ul").append('<li><a href="#" onclick="getEventData(this)" id="' + data[i]._id +'">'+data[i].eventName+'</a></li>');
		
		// $("#types-dropdown ul").append('<li><a href="loadEvents" id="loadEvents" value="' + data[i].eventType +'">"'+data[i].eventType+'"</a></li>');

	}
	loadEventArticles(data);
}

function getEventData(e){
	var eventId = e.id;
	console.log("in load event articles: " + e.id);
	
	var eventData = "{"
	eventData += JSON.stringify("eventId");
	eventData += ":";
	eventData += JSON.stringify(e.id);
	eventData += "}";

	$.ajax({
		url: "/getSingleEvent",
		type: "POST",
		data: eventData,
		dataType: "json",
		success: function(data){
			console.log(JSON.stringify(data));
			loadEventArticles(data);
		}
	} );
	// load articles from this specific event id
}

function loadEventArticles(eventData){
	console.log(eventData[0].articleIds);

	/*var articleData = "{"
	articleData += JSON.stringify("articleIds");
	articleData += ":";
	articleData += JSON.stringify(eventData[0].articleIds);
	articleData += "}";*/

	$.ajax({
		url: "/getFewArticles",
		type: "POST",
		data: JSON.stringify(eventData[0].articleIds),
		dataType: "json",
		success: function(data){
			
			console.log(JSON.stringify(data));

			$("#articles-container").children("div").each(function () {
    			if(this.id != "hidden-box"){
    				this.remove();
    			}
			});

			var parentDiv = document.getElementById("articles-container");
			var hiddenBox = document.getElementById("hidden-box");
			var newElement;

			for(var i = 0 ; i < data.length ; i++ ){
				
				newElement = hiddenBox.cloneNode(true);	
				parentDiv.appendChild(newElement);
				newElement.id = i;
				$("#" + i).find("#img_1").attr("src", data[i].imgUrl);
				$("#" + i).find("#a_1").attr("href", data[i].link);
				$("#" + i).find("#span_1").html(data[i].content[0]);
				$("#" + i).css("display", "block");
				
			}
		}
	} );

}

$("#menu-toggle").click(function(e) {
	e.preventDefault();
	$("#wrapper").toggleClass("toggled");
});
