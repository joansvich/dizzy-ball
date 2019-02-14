'use strict';

class Ball {

  constructor(canvas){
    this.size = 20;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = this.canvas.width/2;
    this.y = this.canvas.height - 40;
    this.speed = 5;
    this.direction = 0;
  }

  update(){
    this.x = this.x + this.direction * this.speed;
  }

  draw(){

    this.ctx.fillStyle = 'blue';
    //this.ctx.fillRect(this.x, this.y, this.size, this.size)
    this.ctx.beginPath();
    this.ctx.arc(this.x,this.y,this.size/2,0,2*Math.PI,true);
    this.ctx.fill();
    this.ctx.stroke();
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

  checkCollisionBlock(){

  }



}