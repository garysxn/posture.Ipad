import { Component, OnInit,ngAfterView } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import {MeteorComponent} from 'angular2-meteor';
import {showAlert} from "../shared/show-alert";
import { fabric } from 'fabric';
import template from './posture.component.html';

declare var fabric:any;
declare var jQuery: any;

@Component({
  selector: 'posture',
  template
})
@InjectUser('user')
export class PostureComponent extends MeteorComponent implements OnInit {
   
    restorePoints: any[];    
    imgSrc:string;
    drawGrid: boolean;
    undoFlag: boolean;
    firstFrame: string;
    dotFlag: boolean;   
    scale: string;
    canvas: object;
    context: object;
    zoomCanvas: string;
    
    constructor() {
        super();
        this.restorePoints=[];
        this.drawGrid = true;
        this.undoFlag = true;
        this.dotFlag =  false;
        this.scale = 1.0;
        this.zoomCanvas = '';
        
    }

    ngOnInit() {
        this.canvas = new fabric.Canvas('postureCanvas');
        this.context = this.canvas.getContext('2d');
        
        
        /* draw canvas */
        this.draw();
        
    }
    
        draw(){
        
        let context = this.context;
        let thisCanvas = this.canvas;
        thisCanvas.width  = 600;
        thisCanvas.height = 500;
        
        /* draw image*/
        base_image = new Image();
        base_image.src = 'images/80567430_o1.jpg';
        base_image.onload = function(){
            context.drawImage(base_image, 0, 0);
          
            /* base line */
            context.beginPath();
            context.moveTo(thisCanvas.width/2, 0);
            context.lineTo(thisCanvas.width/2, thisCanvas.height);
            context.lineWidth = 1.5;        
            context.strokeStyle = '#90EE90';
            context.stroke();        
        }
        
         /* push first frame into array */
        this.firstFrame = this.canvas.toDataURL('image/png');
        this.restorePoints.push(this.firstFrame);
        this.zoomCanvas = this.firstFrame;
        
    }
    
    /* enable dots funtionality */

    /* draw dots on image */
    //  drawDots(e) {
    //      if (this.dotFlag) {           
    //         let context = this.context;
    //         let pos = this.getMousePos(this.canvas, e);
    //      let posx = pos.x;
    //        let posy = pos.y;
    //         console.log(posx,posy);
    //         context.fillStyle = "#FF0000";
    //          context.beginPath();
    //          context.arc(posx, posy, 2, 0, 2*Math.PI);
    //         context.fill();
                    
    //          this.imgSrc = this.canvas.toDataURL('image/png');
    //         this.restorePoints.push(this.imgSrc);
    //         this.zoomCanvas = this.imgSrc;
    //          //console.log(this.restorePoints.length,'restorePoints');
    //     }                
    //  }
    
    /* posture grid draw */
    drawPostureGrid(){
    var grid = 50;
    for (var i = 0; i < (600 / grid); i++) {
    this.canvas.add(new fabric.Line([ i * grid, 0, i * grid, 600], { stroke: '#808080', selectable: true,hasControls:false,strokeWidth:2,padding:8 }));
    this.canvas.add(new fabric.Line([ 0, i * grid, 600, i * grid], { stroke: '#808080', selectable: true ,hasControls:false,strokeWidth:2,padding:10}))
    this.canvas.add(new fabric.Line([ 0, i * grid, 600, i * grid], { stroke: '#808080', selectable: true ,hasControls:false,strokeWidth:2,padding:10}))
    
}

    }


/* draw dots on grid */
    dotcontrol(e){
    console.log('dots');
   var circle, isDown, origX, origY;  
   this.canvas.observe('mouse:down', function(o){
   isDown = true;
   var pointer =this.getPointer(o.e);
   origX = pointer.x;
   origY = pointer.y;
   circle = new fabric.Circle({
    left: pointer.x,
    top: pointer.y,
    radius: 2,
    strokeWidth: 1,
    stroke: 'red',
    fill: 'red',
    selectable: false,
    originX: 'center', originY: 'center'
  });
   this.add(circle);
}); 
}

/* draw lines */

drawlines(e)
{
console.log('lines');
var point1;
this.canvas.on('mouse:down', function (options) {

    var x = options.e.clientX - this._offset.left;
    var y = options.e.clientY -  this._offset.top;

    var circle = new fabric.Circle({
        left: x,
        top: y,
        fill: 'red',
        originX: 'center',
        originY: 'center',
        hasControls: false,
        hasBorders: false,
        lockMovementX: true,
        lockMovementY: true,
        radius: 5,
        hoverCursor: 'default'
    });
      this.add(circle);
   

     if (point1 === undefined) {
        point1 = new fabric.Point(x, y)
    } else {
        this.add(new fabric.Line([point1.x, point1.y, x, y], {
            stroke: 'blue',
            hasControls: false,
            hasBorders: false,
            lockMovementX: true,
            lockMovementY: true,
            hoverCursor: 'default'
        }))
        point1 = undefined;
    }
})
}



    /* zoom in */

  zoomIn() {
    // TODO limit the max canvas zoom in
    var canvasScale = 1;
    var SCALE_FACTOR = 1.2;

    canvasScale = canvasScale * SCALE_FACTOR;
    var objects = this.canvas.getObjects();
    for (var i in objects) {
        var scaleX = objects[i].scaleX;
        var scaleY = objects[i].scaleY;
        var left = objects[i].left;
        var top = objects[i].top;
        
        var tempScaleX = scaleX * SCALE_FACTOR;
        var tempScaleY = scaleY * SCALE_FACTOR;
        var tempLeft = left * SCALE_FACTOR;
        var tempTop = top * SCALE_FACTOR;
        
        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;
        
        objects[i].setCoords();
    }
        
   this.canvas.renderAll();
}


   /*zoom out */

      zoomOut() {
    // TODO limit max cavas zoom out
        var canvasScale = 1;
        var SCALE_FACTOR = 1.2;

    canvasScale = canvasScale / SCALE_FACTOR;
    
    var objects = this.canvas.getObjects();
    for (var i in objects) {
        var scaleX = objects[i].scaleX;
        var scaleY = objects[i].scaleY;
        var left = objects[i].left;
        var top = objects[i].top;
    
        var tempScaleX = scaleX * (1 / SCALE_FACTOR);
        var tempScaleY = scaleY * (1 / SCALE_FACTOR);
        var tempLeft = left * (1 / SCALE_FACTOR);
        var tempTop = top * (1 / SCALE_FACTOR);

        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;

        objects[i].setCoords();
    }
    
    this.canvas.renderAll();        
}

    
   
   /* undo */

   drawUndo()
   {
     console.log('undo');
    this.canvas.on('object:added',function(){
  if(!isRedoing){
    h = [];
  }
  isRedoing = false;
});

var isRedoing = false;
var h = [];
  if(this.canvas._objects.length>0){
   h.push(this.canvas._objects.pop());
   this.canvas.renderAll();
   

}
     
   }
   
/*clear grid and dots */

removePostureGrid()
{

   this.canvas.clear().renderAll()
}

    /* clear all draw events */
    // removePostureGrid(){
    //     this.restorePoints=[];
    //     this.drawGrid = true;
    //     this.undoFlag = true;
    //     this.dotFlag = false;
    // }
    
    // /* undo draw elements from canvas */
    // drawUndo(){
    //     //console.log(this.undoFlag,'this.undoFlag');
    //     if (this.undoFlag) {
    //         let firstPop = this.restorePoints.pop();
    //     }
        
    //     let context = this.context;
    //     var oImg = new Image();        
    //     oImg.src = this.restorePoints.pop();
        
    //     context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //     context.drawImage(oImg, 0, 0);
        
    //     this.undoFlag = false;
        
    //     //console.log(this.restorePoints.length,'length');
    //     if (this.restorePoints.length < 1) {
    //         this.restorePoints=[];
    //         this.drawGrid = true;
    //         this.undoFlag = true;
    //         this.restorePoints.push(this.firstFrame);
    //     }
        
    // }
    
    // /* zoom functionality */
    // zoomIn(){
    //     console.log('zoom in');
    //     var scaleMultiplier = 1;
    //     var translatePos = {
    //         x: 0,
    //         y: 0
    //     };
    //     console.log(this.scale,' / ', scaleMultiplier);
        
    //     this.scale = this.scale + scaleMultiplier;
    //     //if (this.scale>1) {
    //         this.scalePosture(this.scale, translatePos);
    //     //}
    // }
    
    // zoomOut(){
    //     console.log('zoom out');
    //     var scaleMultiplier = 1;
    //     var translatePos = {
    //         x: 0,
    //         y: 0
    //     };
    //     console.log(this.scale,' / ', scaleMultiplier);
                
    //     this.scale = this.scale - scaleMultiplier;
    //     //if (this.scale>0) {
    //         this.scalePosture(this.scale, translatePos);
    //     //}
        
    // }
    
    
    
    // /* scale canvas */
    // scalePosture(scale, translatePos){
    //     console.log(scale,'scalePosture');
        
    //     let context = this.context;
    //     let thisCanvas = this.canvas;
    //      // clear canvas
    //     context.clearRect(0, 0, thisCanvas.width, thisCanvas.height);
        
    //     context.save();
    //     context.translate(translatePos.x, translatePos.y);
    //     context.scale(scale, scale);
    //     //console.log(this.zoomCanvas,'this.zoomCanvas');
        
    //     base_image = new Image();
    //     base_image.src = this.zoomCanvas;
    //     context.drawImage(base_image, 0, 0);
    //     //base_image.onload = function(){
    //     //    console.log('before',base_image);
    //     //    context.drawImage(base_image, 0, 0);
    //     //    this.zoomCanvas = thisCanvas.toDataURL('image/png');
    //     //    console.log('after');
    //     //}        
    //     this.zoomCanvas = thisCanvas.toDataURL('image/png');
    //     //context.restore();
        
    // }
    
    // /* draw grid lines */
    // drawGridLines(cnv, lineOptions) {
    
    //     var iWidth = cnv.width;
    //     var iHeight = cnv.height;
        
    //     let context = this.context;
    
    //     context.strokeStyle = lineOptions.color;
    //     context.lineWidth = .05;
        
    //     context.beginPath();
    
    //     var iCount = null;
    //     var i = null;
    //     var x = null;
    //     var y = null;
    
    //     iCount = Math.floor(iWidth / lineOptions.separation);
    
    //     for (i = 1; i <= iCount; i++) {
    //         x = (i * lineOptions.separation);
    //         context.moveTo(x, 0);
    //         context.lineTo(x, iHeight);
    //         context.stroke();
    //     }
    
    //     iCount = Math.floor(iHeight / lineOptions.separation);
    
    //     for (i = 1; i <= iCount; i++) {
    //         y = (i * lineOptions.separation);
    //         context.moveTo(0, y);
    //         context.lineTo(iWidth, y);
    //         context.stroke();
    //     }
    //     context.closePath();
    
    //     return;
    // }
    
    // /* get mouse position */
    // getMousePos(canvas, evt) {
    //     var rect = canvas.getBoundingClientRect();
    //     return {
    //       x: evt.clientX - rect.left,
    //       y: evt.clientY - rect.top
    //     };
    // }
    
   




}