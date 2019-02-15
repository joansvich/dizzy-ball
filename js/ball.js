'use strict';

class Ball {

  constructor(canvas,color){
    //this.size = 20;
    this.sizeX = 46;
    this.sizeY = 94;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = this.canvas.width/2;
    this.y = this.canvas.height - this.sizeY;
    this.speed = 4;
    this.color = color;
    this.direction = 0;
    this.puntuation = 0;
    this.image = document.getElementById('source');
    
  }

  update(){
    this.x = this.x + this.direction * this.speed;
  }

  draw(){
    this.ctx.drawImage(this.image, this.x - this.sizeX/2, this.y);
    /*this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x - this.sizeX/2, this.y, this.sizeX, this.sizeY)*/

    // this.ctx.beginPath();
    // this.ctx.arc(this.x,this.y,this.size/2,0,2*Math.PI,true);
    // this.ctx.fill();
    // this.ctx.stroke();
  }

  gainPoints(num){
    this.puntuation = this.puntuation + num;
  }

  setDirection(direction){
    this.direction = direction;
  }

  checkScreen(){
    if(this.x - this.sizeX/2 <=0){
      this.direction = 1;
    }else if (this.x+this.sizeX/2 >= this.canvas.width){
      this.direction = -1;
    }
  }

  checkCollisionBlocks(block){
    const collideRight = block.xInicio < this.x+this.sizeX/2;
    const collideLeft = block.xFinal > this.x-this.sizeX/2;
    const collideTop = block.posY+block.y/2 > this.y;
    const collideBottom = block.posY-block.y/2 < this.y+this.sizeY;

    if(collideRight && collideLeft && collideTop && collideBottom){
      return true;
    }

    return false;

  }

  printPuntuationCallback(){
    
    return this.puntuation;
  }
  



}