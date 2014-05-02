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
    this.lineWeight = 20;
    this.deep = 2;
    this.layer.add(this.background);
    this.layer.add(this.text);
    this.stage.add(this.layer);
    this.delete = false;

    this.bindEvents();
    this.initPalete();
    return this;
}

Painter.prototype.bindEvents = function(){
    var self = this;
    this.background.on("mousedown", function(){
        if(!self.delete){
            self.moving = true;
            self.line = new Kinetic.Line({
                stroke: "red",
                strokeWidth: self.lineWeight,
                draggable: true,
                name : "name"
            });
            var line = self.line;
            line.on('click', function(evt) {
                if (self.delete) {
                    var shape = evt.targetNode;
                    line.destroy(shape);
                    this.remove();  
                    self.layer.drawScene();
                } 
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
    return this;
}
Painter.prototype.writeMessage = function(message){
    this.text.setText(message);
    this.layer.draw();
}
Painter.prototype.addRect = function(width, height){
    var self = this;
    var rect = new Kinetic.Rect({
        x: 80,
        y: 80,
        width: width,
        height: height,
        stroke: "red",
        strokeWidth: this.lineWeight,
        draggable: true,
        name : "name"
    });
    rect.on('click', function() {
        var shape = this.attrs.id;
        rect.destroy(shape);
        self.delete && this.remove();
        self.layer.drawScene();
    });
    this.writeMessage("Ширина: " + width/16+"м" + "  Длина: " + height/16+"м");
    this.layer.add(rect);
    this.layer.draw();
    console.log(this.layer.find("Rect"));
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
        draggable: true,
        name : "name"
    });

    line.on('click', function() {
        var shape = this.attrs.id;
        line.destroy(shape);
        self.delete && this.remove();
        self.layer.drawScene();
    });
    this.writeMessage("Длина : " + Math.round(Math.sqrt( Math.pow(end.x - start.x,2)  + Math.pow(end.y - start.y,2))/16) + "  Угол:" + (angle-90));
    this.layer.add(line);
    this.layer.draw();
}
Painter.prototype.addFloor = function(width, height){
    var self = this;
    var rect = new Kinetic.Rect({
        x: 80,
        y: 80,
        width: width,
        height: height,
        stroke: "grey",
        fill: 'grey',
        strokeWidth: this.lineWeight,
        draggable: true,
        name : "floor"
    });
    rect.on('click', function() {
        var shape = this.attrs.id;
        rect.destroy(shape);
        self.delete && this.remove();
        self.layer.drawScene();
    });
    this.writeMessage("Ширина: " + width/16+"м" + "  Длина: " + height/16+"м");
    this.layer.add(rect);
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
    $('#lineWeight').jqxInput({placeHolder: "Стена: 400мм", height: 20, width: 90});
    $('#lineWeight').on('change', function(){
        if(this.value == "") self.lineWeight = 10 
            else if( parseFloat(this.value) > 1000 || parseFloat(this.value) < 120 ) alert("Недопустимая ширина стены")
                else self.lineWeight = parseFloat(this.value)/20;
    })
    
    var isPainter = true;
    $('#line').bind("click",function(){
        $('#windowLine').jqxWindow('open');
    })    
    $('#floor').bind("click",function(){
        $('#windowFloor').jqxWindow('open');
    })
    $('#rect').bind("click",function(){
        $('#windowRect').jqxWindow('open');
    })

    $('#lineLength').jqxInput({placeHolder: "10", height: 25, width: 200});
    $('#lineAngle').jqxInput({placeHolder: "0", height: 25, width: 200});
    $("#addLine").jqxButton({ width: '150'});
    $("#addLine").on('click', function () {
        var length = $('#lineLength').val();
        var angle = $('#lineAngle').val();
        if(length == "") length = 10;
        if(angle == "") angle = 0;
        painter.addLine(length * 16 , parseFloat(angle));
        $("#windowLine").jqxWindow('close');
    });
    $("#windowLine").jqxWindow({ width: 300, height: 130, isModal: true, autoOpen: false });
 
 // 
    $('#rectHeight').jqxInput({placeHolder: "10", height: 25, width: 200});
    $('#rectWidth').jqxInput({placeHolder: "10", height: 25, width: 200});
    $("#addRect").jqxButton({ width: '150'});
    $("#addRect").on('click', function () {
        var height = $('#rectHeight').val();
        var width = $('#rectWidth').val();
        if(height == "") height = 10;
        if(width == "") width = 10;
        painter.addRect(height * 16 , width*16);
        $("#windowRect").jqxWindow('close');
    });
    $("#windowRect").jqxWindow({ width: 300, height: 130, isModal: true, autoOpen: false });
    $("#windowFloor").jqxWindow({ width: 300, height: 130, isModal: true, autoOpen: false });
    $("#addFloor").on('click', function () {
        var height = $('#floorHeight').val();
        var width = $('#floorWidth').val();
        if(height == "") height = 10;
        if(width == "") width = 10;
        painter.addFloor(height * 16 , width*16);
        $("#windowFloor").jqxWindow('close');
    });
    $('#floorHeight').jqxInput({placeHolder: "10", height: 25, width: 200});
    $('#floorWidth').jqxInput({placeHolder: "10", height: 25, width: 200});
    $("#addFloor").jqxButton({ width: '150'});
    
    $("#toggle").bind("click",function(){
        $('#painter').toggle('slow');
        isPainter = (isPainter) ? false : true
    });

    $("#resultWindow").jqxWindow({ width: 400, height: 200, isModal: true, autoOpen: false });

    return this;
}

Painter.prototype.getPrimeter = function(){
    var nodes = this.stage.find(".name");
    var width = 0;
    for(var i in nodes){
        if(nodes[i].className == "Line"){
            var points = nodes[i].points()
            width += Math.round(Math.sqrt( Math.pow(points[2] - points[0],2)  + Math.pow(points[3] - points[1],2))/16);
        }
        if(nodes[i].className == "Rect"){
            var w = Math.round(nodes[i].getWidth()/16);
            var h = Math.round(nodes[i].getHeight()/16);
            width += 2*(h+w);
        }
    }
    return width;
}
Painter.prototype.getFloorSquare = function(){
    var nodes = this.stage.find(".floor");
    var square = 0;
    for(var i in nodes){
        if(nodes[i].className == "Rect"){
            var w = Math.round(nodes[i].getWidth()/16);
            var h = Math.round(nodes[i].getHeight()/16);
            square += (h*w);
        }
    }
    return square;
}
Painter.prototype.getStage = function(){return this.stage}
Painter.prototype.getLineWeight = function(){return this.lineWeight*20}
Painter.prototype.getDeep = function(){return this.deep}