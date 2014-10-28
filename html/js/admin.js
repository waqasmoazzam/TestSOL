$(document).ready(function() {

	alert("page ready");
	addArticleData(null);

	
	//$( '#submit' ).click( showValues );


} );

/*$('#event-form').on('submit', function(e){
	alert('in submit button');
	e.preventDefault();

	$.ajax({
		url: "/admin",
		type: "POST",
		data: $('#event-form').serialize(),
		success: function(data){
			alert("Successfully submitted." + data);
		}
	});
});*/

function addArticleData(data)
{

    // Find a <table> element with id="myTable":
    var table = document.getElementById("articles_list");
    

    for(var i = 0 ; i < 10 ; i++){
    	var currentPlace = table.length
	// Create an empty <tr> element and add it to the 1st position of the table:
		var row = table.insertRow(currentPlace);

		// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
		var cb = row.insertCell(0);
		var id = row.insertCell(1);
		var title = row.insertCell(2);
		var link = row.insertCell(3);
		var type = row.insertCell(4);

		// Add some text to the new cells:
		cb.innerHTML = "<input type='checkbox' id='checkbox_" + i + "' name='checkbox_" + i + "'>";
		id.innerHTML = "NEW CELL" + i;
		title.innerHTML = "NEW CELL" + i;  
		link.innerHTML = "NEW CELL" + i;
		type.innerHTML = "NEW CELL" + i; 	
	}


}

function checkAll(bx){
	$(':checkbox').prop('checked', bx.checked);

}
