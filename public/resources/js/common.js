function main(){
	// $( "#content" ).load("home.html");
	// $( "#content" ).load("brick_calc.html");
	$( "#content" ).load("base_sost.html");
	$( "#footer" ).load("footer.html");
	$( "#menu" ).load("menu.html");
}
function showResult(res, image){
	$('#resultWindow').jqxWindow('open');
	$("#resultContainer").empty();
	$("#resultContainer").append(res);
	$("#print").bind("click",function(){window.print()})
	$("#resultContainer").append(image);
}
function loadToContent(page){
	$( "#content" ).empty();
	$( "#content" ).load(page);
}
function toPalete(elems){ $('#palete').append(elems)}