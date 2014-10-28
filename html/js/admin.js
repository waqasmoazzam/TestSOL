$(document).ready(function() {
	
	//addArticleData(null);
	//$( '#submit' ).click( showValues );	

} );




$('#event-form').on('submit', function(e){
	
	e.preventDefault();

	if($("#inputEventName").val() == ""){
		 $("#inputEventName").focus();
		$("span").css("color","red");
		$("span").css("display","inline").fadeOut(3000);
  		return;
  	}	

	$.ajax({
		url: "/createNewEvent",
		type: "POST",
		data: $('#event-form').serialize(),
		success: function(data){
			alert("Successfully submitted." + data);
			document.forms['event-form'].reset();

		}
	});
});

$('#load-articles').on('click', function(e){
	
	e.preventDefault();

	$.ajax({
		url: "/getAllArticles",
		type: "GET",
		success: function(data){
			$('#load-articles').attr("class", "hide_btn");
			$('#articles-list').attr("class", "show_table");
			//loadArticles(data);
		}
	});

	
	
});


$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {
       loadArticles(null);
   }
});

function loadArticles(data)
{

    // Find a <table> element with id="myTable":
    var table = document.getElementById("articles_list");
    
    console.log("table current location: "+ table.rows.length);
    for(var i = 0 ; i < 20 ; i++){
    	var currentPlace = table.rows.length
		var row = table.insertRow(currentPlace);

		var cb = row.insertCell(0);
		var title = row.insertCell(1);
		var type = row.insertCell(2);
		

		var id = data[i]._id;
		// Add some text to the new cells:
		cb.innerHTML = "<input type='checkbox' id='" + id + "' name='" + id + "'>";
		var titleStr = data[i].content[0];
		titleStr = titleStr.replace("h3", "h4");
		titleStr = titleStr.replace("href", " target=_blank href");
		title.innerHTML = titleStr;  
		type.innerHTML = data[i].type; 	
		
	}


}

function checkAll(bx){
	$(':checkbox').prop('checked', bx.checked);

}
