'use strict';

class Ball {

  constructor(canvas,pj){
    //this.size = 20;
    this.sizeX = 46;
    this.sizeY = 94;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = this.canvas.width/2;
    this.y = this.canvas.height - this.sizeY-26;
    this.speed = 4;
    this.cont = 0;
    this.typePj = pj;
    this.direction = 0;
    this.puntuation = 0;
    this.imageSprite = document.getElementById('spriteImage');
    this.imageSpriteLeft = document.getElementById('spriteImageLeft');
    this.imageSpriteRight = document.getElementById('spriteImageRight');
    this.position=0;
  }

  update(){
    this.x = this.x + this.direction * this.speed;
  }

  modifyPosition(){
    if(this.cont>15){
      if (this.position < 92)
        { this.position = this.position + 46;}
      else
        { this.position = 46; }
      this.cont=0;
    }
    this.cont++;
  }
  
  draw(){
    if(this.direction===0){
      this.ctx.drawImage(this.imageSprite, this.position, 0, this.sizeX, this.sizeY, this.x - this.sizeX/2, this.y, this.sizeX, this.sizeY);
      this.modifyPosition();
    }
    if(this.direction===-1){
      this.ctx.drawImage(this.imageSpriteLeft, this.position, 0, this.sizeX, this.sizeY, this.x - this.sizeX/2, this.y, this.sizeX, this.sizeY);
      this.modifyPosition();
    }
    if(this.direction===1){
      this.ctx.drawImage(this.imageSpriteRight, this.position, 0, this.sizeX, this.sizeY, this.x - this.sizeX/2, this.y, this.sizeX, this.sizeY);
      this.modifyPosition();
    }
    
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