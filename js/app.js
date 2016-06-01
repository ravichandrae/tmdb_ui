function performSearch() {
	var searchQuery = $("#searchQuery").val();
	$.ajax({
        type : "GET",
        url : "http://52.77.217.113:8080/person/search?name=" + searchQuery,
        contentType :"application/json; charSet=UTF-8",
    })
    .done(function(data){
        renderPeople(data);
    })
    .fail(function(data){
        alert(data);
    });
}

function renderPeople(searchResults) {
	var resultHtml = "";
	resultHtml += "<div class=\"row\">";
	for(var i = 0; i < searchResults.length; i++) {
		resultHtml += "<div class=\"panel panel-default\">";
  		resultHtml += "<div class=\"panel-body\">";
  		resultHtml += "<div class=\"container\">";
  		resultHtml += "<div class=\"col-sm-2\">"
  		var imageUrl = "https://upload.wikimedia.org/wikipedia/commons/5/50/User_icon-cp.svg";
  		if( searchResults[i].imageUrl )
  			imageUrl = searchResults[i].imageUrl;
  		resultHtml += "<img src=\"" + imageUrl + "\" class=\"img-rounded\" alt=\"NTR\" width=\"80\" height=\"100\">";
  		resultHtml += "</div>";
  		resultHtml += "<div class=\"col-sm-10\">"
  		resultHtml += "<div class=\"row\">";
		resultHtml += "<label>" + searchResults[i].name + "</label>";
		resultHtml += "</div>";

		resultHtml += "<div class=\"row\">";
		resultHtml += "<label>";
		for(var ai = 0; ai < searchResults[i].occupations.length; ai++) {
			resultHtml += searchResults[i].occupations[ai].value + " ";
		}
		resultHtml +=  "</label>";
		resultHtml += "</div>";

		resultHtml += "<div class=\"row\">";
		resultHtml += "<label>జననం: ";
		if( searchResults[i].birthDate )
			resultHtml += searchResults[i].birthDate;
		if( searchResults[i].birthPlace )
			resultHtml += " (" + searchResults[i].birthPlace + ")";
		resultHtml += "</div>";
		
		resultHtml += "<div class=\"row\">";
		if( searchResults[i].deathDate ) {
			resultHtml += "<label>మరణం: ";
			resultHtml += searchResults[i].deathDate;
			if( searchResults[i].deathPlace )
				resultHtml += " (" + searchResults[i].deathPlace + ")";
			resultHtml += "</label>";
		}

		resultHtml += "</div>";
		resultHtml += "</div>";
		resultHtml += "</div>"; //End container
		resultHtml += "</div>"; //End Panel body
		resultHtml += "</div>"; //End Panel
	}
	resultHtml += "</div>";
	$("#pageContainer").html(resultHtml);
}