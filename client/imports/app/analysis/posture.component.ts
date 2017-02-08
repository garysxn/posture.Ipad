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
    dotFlag: boolean;
    scale: string;
    canvas: object;
    
    constructor() {
        super();
        this.restorePoints=[];
        this.drawGrid = true;
        this.undoFlag = true;
        this.dotFlag = false;
        this.scale = 1.0;
        
    }

    ngOnInit() {
        this.canvas = document.getElementById('postureCanvas');;
        var translatePos = {
            x: 0,
            y: 0
        };
     
        //var scale = 1.0;
        var scaleMultiplier = 0.8;
        var startDragOffset = {};
        var mouseDown = false;
    
        /* draw canvas */
        this.draw(this.scale, translatePos);
        
        /* push first frame into array */
        //this.firstFrame = canvas.toDataURL('image/png');
        //this.restorePoints.push(this.firstFrame);
        
        
    }
    
    /* enable dots funtionality*/
    enableDots(){
        this.dotFlag = true;
    }
    
    /* draw dots on image */
    drawDots(e) {
        if (this.dotFlag) {           
            var context = this.canvas.getContext('2d');
            //console.log(e,'event');
            let pos = this.getMousePos(this.canvas, e);
            let posx = pos.x;
            let posy = pos.y;
            //console.log(posx,posy);
            context.fillStyle = "#FF0000";
            context.beginPath();
            context.arc(posx, posy, 2, 0, 2*Math.PI);
            context.fill();
                    
            this.imgSrc = this.canvas.toDataURL('image/png');
            this.restorePoints.push(this.imgSrc);
            //console.log(this.restorePoints.length,'restorePoints');
        }                
    }
    
    /* posture grid draw */
    drawPostureGrid(){
        this.drawGrid = false;
        var gridOptions = {
            majorLines: {
                separation: 20,
                color: '#a1a1a1'
            }
        };    
        this.drawGridLines(this.canvas, gridOptions.majorLines);
                
        this.imgSrc = this.canvas.toDataURL('image/png');
        this.restorePoints.push(this.imgSrc);
    }
    
    /* clear all draw events */
    removePostureGrid(){
        this.restorePoints=[];
        this.drawGrid = true;
        this.undoFlag = true;
        this.dotFlag = false;
    }
    
    /* undo draw elements from canvas */
    drawUndo(){
        //console.log(this.undoFlag,'this.undoFlag');
        if (this.undoFlag) {
            let firstPop = this.restorePoints.pop();
        }
        
        var canvasContext = this.canvas.getContext('2d');
        var oImg = new Image();        
        oImg.src = this.restorePoints.pop();
        
        canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        canvasContext.drawImage(oImg, 0, 0);
        
        this.undoFlag = false;
        
        //console.log(this.restorePoints.length,'length');
        if (this.restorePoints.length < 1) {
            this.restorePoints=[];
            this.drawGrid = true;
            this.undoFlag = true;
            this.restorePoints.push(this.firstFrame);
        }
        
    }
    
    /* zoom functionality */
    zoomGrid(){
        console.log('zoom in');
        var scaleMultiplier = 0.8;
        var translatePos = {
            x: 0,
            y: 0
        };
        
        this.scale /= scaleMultiplier;
        this.draw(this.scale, translatePos);        
    }
    
    zoomOut(){
        console.log('zoom out');
        var scaleMultiplier = 0.8;
         var translatePos = {
            x: 0,
            y: 0
        };
        this.scale *= scaleMultiplier;
        this.draw(this.scale, translatePos);
    }
    
    /* draw canvas */
    draw(scale, translatePos){
        var canvasContext = this.canvas.getContext('2d');
        let thisCanvas = this.canvas;
        thisCanvas.width  = 600;
        thisCanvas.height = 500;
        
        canvasContext.clearRect(0, 0, thisCanvas.width, thisCanvas.height);
     
        canvasContext.save();
        canvasContext.translate(translatePos.x, translatePos.y);
        canvasContext.scale(scale, scale);
        
        /* draw image*/
        base_image = new Image();
        base_image.src = 'images/80567430_o1.jpg';
        base_image.onload = function(){
            canvasContext.drawImage(base_image, 0, 0);
          
            /* base line */
            canvasContext.beginPath();
            canvasContext.moveTo(thisCanvas.width/2, 0);
            canvasContext.lineTo(thisCanvas.width/2, thisCanvas.height);
            canvasContext.lineWidth = 1.5;        
            canvasContext.strokeStyle = '#90EE90';
            canvasContext.stroke();        
        }        
    }
    
    /* draw grid lines */
    drawGridLines(cnv, lineOptions) {
    
        var iWidth = cnv.width;
        var iHeight = cnv.height;
    
        var ctx = cnv.getContext('2d');
    
        ctx.strokeStyle = lineOptions.color;
        //ctx.strokeWidth = 2;
        ctx.lineWidth = .05;
        
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
        ctx.closePath();
    
        return;
    }
    
    /* get mouse position */
    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    }
    
}