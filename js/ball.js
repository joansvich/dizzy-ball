'use strict';

class Ball {

  constructor(canvas,color){
    this.size = 20;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = this.canvas.width/2;
    this.y = this.canvas.height - 40;
    this.speed = 3;
    this.color = color;
    this.direction = 0;
    this.puntuation = 0;
  }

  update(){
    this.x = this.x + this.direction * this.speed;
  }

  draw(){
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x,this.y,this.size/2,0,2*Math.PI,true);
    this.ctx.fill();
    this.ctx.stroke();
  }

  gainPoints(num){
    this.puntuation = this.puntuation + num;
  }

  setDirection(direction){
    this.direction = direction;
  }

  checkScreen(){
    if(this.x - this.size/2 <=0){
      this.direction = 1;
    }else if (this.x+this.size/2 >= this.canvas.width){
      this.direction = -1;
    }
  }

  checkCollisionBlocks(block){
    const collideRight = block.xInicio < this.x+this.size/2;
    const collideLeft = block.xFinal > this.x-this.size/2;
    const collideTop = block.posY+block.y/2 > this.y-this.size/2;
    const collideBottom = block.posY-block.y/2 < this.y+this.size/2;

    if(collideRight && collideLeft && collideTop && collideBottom){
      return true;
    }

    return false;

  }

  printPuntuationCallback(){
    
    return this.puntuation;
  }
  



}