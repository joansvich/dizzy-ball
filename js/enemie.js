'use strict';

class Enemie {

  constructor(posX,posY,canvas){
    this.sizeX = 25;
    this.sizeY = 50;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.posX = posX;
    this.posY = posY;
    this.imageEnemie = document.getElementById('imageEnemie');
  }

  update(){
    this.posY = this.posY + 5;
  }

  draw(){
    this.ctx.drawImage(this.imageEnemie, this.posX, this.posY);
  }
  
}