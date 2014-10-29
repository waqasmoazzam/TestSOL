$(document).ready(function() {
	makeAjaxCallForArticles();
} );

$(document).onload(function() {
	makeAjaxCallForArticles();
} );

function makeAjaxCallForEvents(){
	console.log("In scroll ajax");
	$.ajax({
		url: "/getAllEvents",
		type: "GET",
		success: function(data){
			alert(data);
		}
	} );
}
