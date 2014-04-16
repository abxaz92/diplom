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
    })
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
                strokeWidth: 10,
                draggable: true
            });
            line = self.line;
            line.on('click', function() {
                var shape = this.attrs.id;
                line.destroy(shape);
                self.layer.draw();
                self.delete && this.remove();
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
                self.writeMessage("Длина : " + Math.round(Math.sqrt( Math.pow(mousePos.x - self.start.x,2)  + Math.pow(mousePos.y - self.start.y,2))), mousePos);
            } else{
                self.writeMessage("Длина : " + Math.round(Math.sqrt( Math.pow(mousePos.x - self.start.x,2)  + Math.pow(mousePos.y - self.start.y,2))), mousePos);
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

Painter.prototype.writeMessage = function(message, mousePos){
    this.text.setText(message);
    this.layer.draw();
}
Painter.prototype.initPalete = function(){
    var self = this;
    $('#delete').bind("click",function(){
        // if (!self.delete) self.delete = true else self.delete = false;
        self.delete = ( !self.delete) ? true : false
    });
}