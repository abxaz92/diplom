function main(){
	$( "#content" ).load("home.html");
	// $( "#content" ).load("brick_calc.html");
	// $( "#content" ).load("base_sost.html");
	// $( "#content" ).load("floor_wood.html");
	// $( "#content" ).load("block_calc.html");
	$( "#footer" ).load("footer.html");
	$( "#menu" ).load("menu.html");
}
function showResult(res, image){
	$('#resultWindow').jqxWindow('open');
	$("#resultContainer").empty();
	$("#resultContainer").append('<img class="print cp" id="print" src="resources/img/print.png"></img>'
		+res
		+'<div class="res_img" id="for_img"></div>'
		);
	$("#print").bind("click",function(){window.print()})
	$("#for_img").append(image);
}
function loadToContent(page){
	$( "#content" ).empty();
	$( "#content" ).load(page);
}
function toPalete(elems){ $('#palete').append(elems)}
function setHead(head){
	$('#head').empty();
	$('#head').append(head);
}