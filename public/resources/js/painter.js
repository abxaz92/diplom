line = null;
initDrawing = function(container){
	stage = new Kinetic.Stage({
		container: container,
		width: 500,
		height: 500
	});
	layer = new Kinetic.Layer();
		stage.add(layer);

    background = new Kinetic.Rect({
        x: 0, 
        y: 0, 
        width: stage.getWidth(),
        height: stage.getHeight(),
        fill: "white"
    });

    layer.add(background);
    stage.add(layer);
    
    moving = false;

    background.on("mousedown", function(){
            moving = true;
            line = new Kinetic.Line({
                stroke: "red"
            });
            var mousePos = stage.getPointerPosition();
                line.points([ mousePos.x, mousePos.y, mousePos.x, mousePos.y]);
                start = {x:mousePos.x, y:mousePos.y}
                layer.drawScene();            

    });

    background.on("mousemove", function(){
        if(moving){
            layer.add(line);
            var mousePos = stage.getPointerPosition();
            console.log("x",Math.abs(mousePos.x - start.x));
            console.log("y",Math.abs(mousePos.y - start.y));
            if( Math.abs(mousePos.x - start.x) < Math.abs(mousePos.y - start.y)){
                line.points()[3] = mousePos.y;
            } else{
                line.points()[2] = mousePos.x;
            }

            layer.drawScene();
        }
    });

    background.on("mouseup", function(){
        moving = false;            
    });	
}