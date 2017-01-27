import { Component, OnInit } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import {MeteorComponent} from 'angular2-meteor';
import {showAlert} from "../shared/show-alert";


import template from './postureImage.component.html';

@Component({
  selector: '',
  template
})
@InjectUser('user')
export class PostureImageComponent extends MeteorComponent implements OnInit {
   
    constructor() {
        super();
    }

    ngOnInit() {
        
    }
    
    
    
    /* draw dots*/
    draw(e) {
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
    }
    
    drawPostureGrid(){
        drawGrid()
    }
    
    removePostureGrid(){
        var canvas = document.getElementById("postureCanvas");
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    //ngAfterViewInit(){
    //    drawGrid()
    //}
    

}

/* draw grid */
function drawGrid() {
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