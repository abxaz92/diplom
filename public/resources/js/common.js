function main(){
	$( "#content" ).load("home.html");
	// $( "#content" ).load("brick_calc.html");
	$( "#footer" ).load("footer.html");
	$( "#menu" ).load("menu.html");
}
function showResult(res){
	$('#resultWindow').jqxWindow('open');
	$("#resultContainer").empty();
	$("#resultContainer").append(res);
}
function loadToContent(page){
	$( "#content" ).empty();
	$( "#content" ).load(page);
}