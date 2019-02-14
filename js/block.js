'use strict';

class Block {
  constructor(xInicio,xFinal,posY,canvas){
    this.xInicio = xInicio;
    this.xFinal = xFinal;
    this.y = 10;
    this.posY = posY;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
  }

  update(){
    this.posY++;
  };

  draw(){
    this.ctx.fillStyle = 'red';
    let sizeX = this.xFinal-this.xInicio;
    this.ctx.fillRect(this.xInicio,this.posY,sizeX,this.y);
  };

}