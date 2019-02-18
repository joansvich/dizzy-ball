'use strict';

class Block {
  constructor(xInicio,xFinal,color,posY,canvas){
    this.xInicio = xInicio;
    this.xFinal = xFinal;
    this.y = 10;
    this.color = color;
    this.posY = posY;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.blockBg = document.getElementById('block-bg');
    this.blockBg2 = document.getElementById('block-bg2');
  }

  update(level){
    this.posY = this.posY + level;
  };

  draw(){
    let sizeX = this.xFinal-this.xInicio;
    if(this.color==='red'){
      this.ctx.drawImage(this.blockBg, this.xInicio, this.posY, sizeX, this.y);
    }
    if(this.color ==='green'){
      this.ctx.drawImage(this.blockBg2, this.xInicio, this.posY, sizeX, this.y);
    }
    
    
  };

}