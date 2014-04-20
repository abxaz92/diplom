function Painter(container){
    var self = this;
    this.container = container;
    this.line = null;
    this.moving = false;
    this.stage = new Kinetic.Stage({
        container: container,
        width: 600,
        height: 500
    });
    this.layer = new Kinetic.Layer();
    this.stage.add(this.layer);
    this.background = new Kinetic.Rect({
        x: 0, 
        y: 0, 
        width: this.stage.getWidth(),
        height: this.stage.getHeight(),
        fill: "white"
    });
    this.text = new Kinetic.Text({
        x: 10,
        y: 10,
        fontFamily: 'Calibri',
        fontSize: 24,
        text: '',
        fill: 'black'
    });
    this.lineWeight = 15;
    this.layer.add(this.background);
    this.layer.add(this.text);
    this.stage.add(this.layer);
    this.delete = false;
}
Painter.prototype.bindEvents = function(){
    var self = this;
    this.background.on("mousedown", function(){
        if(!self.delete){
            self.moving = true;
            self.line = new Kinetic.Line({
                stroke: "red",
                strokeWidth: self.lineWeight,
                draggable: true
            });
            line = self.line;
            line.on('click', function(evt) {
                var shape = evt.targetNode;
                line.destroy(shape);
                self.delete && this.remove();
                self.layer.draw();
            });
            var mousePos = self.stage.getPointerPosition();
            self.line.points([ mousePos.x, mousePos.y, mousePos.x, mousePos.y]);
            self.start = {x:mousePos.x, y:mousePos.y}
            self.layer.drawScene();
        }
    });

    this.background.on("mousemove", function(){
        if(self.moving){
            self.layer.add(self.line);
            var mousePos = self.stage.getPointerPosition();
            var orto = Math.abs(mousePos.x - self.start.x) - Math.abs(mousePos.y - self.start.y);
            if(orto < 0){
                self.line.points()[3] = mousePos.y;
                self.line.points()[2] = self.start.x;
                self.writeMessage("Длина : " + Math.round(Math.sqrt( Math.pow(mousePos.x - self.start.x,2)  + Math.pow(mousePos.y - self.start.y,2))/16) + "  Угол: 90");
            } else{
                self.writeMessage("Длина : " + Math.round(Math.sqrt( Math.pow(mousePos.x - self.start.x,2)  + Math.pow(mousePos.y - self.start.y,2))/16) + "  Угол: 0");
                self.line.points()[2] = mousePos.x;
                self.line.points()[3] = self.start.y;
            }

            self.layer.drawScene();
        }
    });

    this.background.on("mouseup", function(){
        self.moving = false;        
    }); 
    this.layer.on('click', function(evt) {
        var shape = evt.targetNode;
    });
}
Painter.prototype.writeMessage = function(message){
    this.text.setText(message);
    this.layer.draw();
}
Painter.prototype.initPalete = function(){
    var self = this;
    $('#delete').bind("click",function(){
        if(self.delete){
            self.delete = false;
            $('#delete').addClass('unselected');
        } else {
            self.delete = true;
            $('#delete').removeClass('unselected');
        }
    });

    // 
    $('#lineWeight').jqxInput({placeHolder: "Стена: 400", height: 20, width: 65});
    $('#lineWeight').on('change', function(){
        self.lineWeight = parseFloat(this.value)/40;
    })

}
Painter.prototype.addRect = function(width, height){
    var self = this;
    var rect = new Kinetic.Rect({
        x: 10,
        y: 10,
        width: width,
        height: height,
        stroke: "red",
        strokeWidth: this.lineWeight,
        draggable: true
    });
    rect.on('click', function() {
        var shape = this.attrs.id;
        line.destroy(shape);
        self.delete && this.remove();
        self.layer.draw();
    });
    this.writeMessage("Ширина: " + width + " Длина: " + height);
    this.layer.add(rect);
    this.layer.drawScene();
}
Painter.prototype.addLine = function(length, angle){
    var self = this;
    var start = {x : 150, y : 150};
    angle += 90;
    var end = {
         x : length * Math.sin(angle*Math.PI/180) + start.x
        ,y : length * Math.cos(angle*Math.PI/180) + start.y
    }
    var line = new Kinetic.Line({
        points: [start.x, start.y, end.x, end.y],
        stroke: "red",
        strokeWidth: this.lineWeight,
        draggable: true
    });

    line.on('click', function() {
        var shape = this.attrs.id;
        line.destroy(shape);
        self.delete && this.remove();
        self.layer.draw();
    });
    this.writeMessage("Длина : " + Math.round(Math.sqrt( Math.pow(end.x - start.x,2)  + Math.pow(end.y - start.y,2))/16) + "  Угол:" + (angle-90));
    this.layer.add(line);
    this.layer.drawScene();
}