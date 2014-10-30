$(document).ready(function() {

	makeAjaxCallForArticles();

} );

$('#event-form').on('submit', function(e){
	
	e.preventDefault();

	if($("#inputEventName").val() == ""){
		 $("#inputEventName").focus();
		$("span").css("color","red");
		$("span").css("display","inline").fadeOut(3000);
  		return;
  	}
  	
	
	var dataArr = $("#event-form").serialize().split("&");

	if(dataArr.length < 4){
  		alert("Minimum 2 articles required to create an event. Try again!");
  		return;
  	}

	$.ajax({
		url: "/createNewEvent",
		type: "POST",
		data: $("#event-form").serialize(),
		success: function(data){
			alert("Event Created!");
			document.forms['event-form'].reset();

		}
	});
});

$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {
      makeAjaxCallForArticles();
   }
});

function makeAjaxCallForArticles(){
	console.log("In scroll ajax");
	$.ajax({
		url: "/getAllArticles",
		type: "GET",
		success: function(data){
			loadArticles(data);
		}
	});
}

function loadArticles(data)
{

    // Find a <table> element with id="myTable":
    var table = document.getElementById("articles_list");
    
    var upperLimit = table.rows.length - 1;
    if(data.length == upperLimit){
    	return;
    }
    index = table.rows.length -1;
    console.log(index);
    for(var i = index ; i < 20 + upperLimit - 1 ; i++){
    	
		if(data[i].type == "AD" || data[i].type == "SERVICE"){
			continue;
		}
    	var currentPlace = table.rows.length
		var row = table.insertRow(currentPlace);

		var cb = row.insertCell(0);
		var title = row.insertCell(1);
		var type = row.insertCell(2);
	
		var id = data[i]._id;
		// Add some text to the new cells:
		cb.innerHTML = "<input type='checkbox' id='" + id + "' name='" + id + "'>";
		var titleStr = data[i].content[0];
		if(titleStr){
			titleStr = titleStr.replace("h1", "h4");
			titleStr = titleStr.replace("h2", "h4");
			titleStr = titleStr.replace("h3", "h4");
			titleStr = titleStr.replace("h5", "h4");
			titleStr = titleStr.replace("h6", "h4");
			titleStr = titleStr.replace("href", " target=_blank href");
			title.innerHTML = titleStr;  	
		} else {
			title.innerHTML = data[i].link;  		
		}
		type.innerHTML = data[i].type;	

	}
	
}

function checkAll(bx){
	$(':checkbox').prop('checked', bx.checked);

}
