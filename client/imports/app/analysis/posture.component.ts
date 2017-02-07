import { Component, OnInit } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import {MeteorComponent} from 'angular2-meteor';
import {showAlert} from "../shared/show-alert";

import template from './posture.component.html';

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
    
    constructor() {
        super();
        this.restorePoints=[];
        this.drawGrid = true;
        this.undoFlag = true;
    }

    ngOnInit() {
        var canvas = document.getElementById('postureCanvas');
        this.firstFrame = canvas.toDataURL('image/png');
        this.restorePoints.push(this.firstFrame);
    }
    
    
    /* draw dots on image */
    drawDots(e) {
        var canvas = document.getElementById('postureCanvas');
        var context = canvas.getContext('2d');
        //console.log(e,'event');
        let pos = getMousePos(canvas, e);
        let posx = pos.x;
        let posy = pos.y;
        context.fillStyle = "#FF0000";
        context.beginPath();
        context.arc(posx, posy, 2, 0, 2*Math.PI);
        context.fill();
                
        this.imgSrc = canvas.toDataURL('image/png');
        this.restorePoints.push(this.imgSrc);
        //console.log(this.restorePoints.length,'restorePoints');        
    }
    
    /* posture grid draw */
    drawPostureGrid(){
        this.drawGrid = false;
        var canvas = document.getElementById("postureCanvas");    
        var gridOptions = {
            majorLines: {
                separation: 20,
                color: '#808080'
            }
        };    
        drawGridLines(canvas, gridOptions.majorLines);
                
        this.imgSrc = canvas.toDataURL('image/png');
        this.restorePoints.push(this.imgSrc);
        //console.log(this.restorePoints,'this.restorePoints');        
    }
    
    /* clear all draw events */
    removePostureGrid(){
        var canvas = document.getElementById("postureCanvas");
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.restorePoints=[];
        this.drawGrid = true;
        this.undoFlag = true;
    }
    
    /* undo draw elements from canvas */
    drawUndo(){
        //console.log(this.undoFlag,'this.undoFlag');
        if (this.undoFlag) {
            let firstPop = this.restorePoints.pop();
            //console.log('firstPop');
        }
        
        var canvas = document.getElementById("postureCanvas");
        var canvasContext = canvas.getContext('2d');
        var oImg = new Image();        
        oImg.src = this.restorePoints.pop();
        
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.drawImage(oImg, 0, 0);
        
        this.undoFlag = false;
        
        //console.log(this.restorePoints.length,'length');
        if (this.restorePoints.length < 1) {
            this.restorePoints=[];
            this.drawGrid = true;
            this.undoFlag = true;
            //console.log('<1',this.firstFrame);
            this.restorePoints.push(this.firstFrame);
        }
        
    }
    
}

/* create grid */
/*function drawGrid() {
    var cnv = document.getElementById("postureCanvas");
    
    var gridOptions = {
        //minorLines: {
        //    separation: 5,
        //    color: '#00FF00'
        //},
        majorLines: {
            separation: 20,
            color: '#808080'
        }
    };

    //drawGridLines(cnv, gridOptions.minorLines);
    drawGridLines(cnv, gridOptions.majorLines);

    return;
}
*/
/* draw grid lines */
function drawGridLines(cnv, lineOptions) {

    var iWidth = cnv.width;
    var iHeight = cnv.height;

    var ctx = cnv.getContext('2d');

    ctx.strokeStyle = lineOptions.color;
    ctx.strokeWidth = 1;
    
    ctx.beginPath();

    var iCount = null;
    var i = null;
    var x = null;
    var y = null;

    iCount = Math.floor(iWidth / lineOptions.separation);

    for (i = 1; i <= iCount; i++) {
        x = (i * lineOptions.separation);
        ctx.moveTo(x, 0);
        ctx.lineTo(x, iHeight);
        ctx.stroke();
    }

    iCount = Math.floor(iHeight / lineOptions.separation);

    for (i = 1; i <= iCount; i++) {
        y = (i * lineOptions.separation);
        ctx.moveTo(0, y);
        ctx.lineTo(iWidth, y);
        ctx.stroke();
    }
    
    //var abc = cnv.toDataURL('image/png');
    //console.log(abc);
    //this.restorePoints.push(abc);
    //console.log(this.restorePoints,'this.restorePoints');
    ctx.closePath();

    return;
}

/* get mouse position */
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}