'use strict';

class Game {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.ball;
    this.blocks = [];
    this.blocks2 = [];
    this.posY = 0;
    this.cont = 0;
    this.gameIsOver = false;
    this.level = 1;
    this.levelNum = 1;
    this.levelBool = false;
    this.isLevelMax = false;
    this.switchBlocks = true;
  };


  startLoop(){
    this.ball = new Ball(this.canvas,1);
    const loop = () => {

      this.updateDom();
      this.createBlocks();
      this.checkAllCollisions();
      this.updateCanvas();
      this.clearCanvas();
      this.drawCanvas();
      this.destroyBlocks();
      this.updateScore();
      this.levelMax();
      
    
      if(!this.gameIsOver){
        window.requestAnimationFrame(loop);
      }
    }
    window.requestAnimationFrame(loop);
  }

  createBlocks(){
    if(this.cont>250|| this.cont===0){
      if(this.ball2){
        if(this.switchBlocks){
          this.cont=0;
          const xFinal = Math.random()*this.canvas.width-80;
          let block1 = new Block(0,xFinal,'red',0,this.canvas);
          let iniciBlock2 = xFinal+80;
          if (iniciBlock2 < 80) {
          iniciBlock2 = 80;
          }
          let block2 = new Block(iniciBlock2,this.canvas.width,'red',0,this.canvas);
          this.blocks.push(block1);
          this.blocks.push(block2);
          this.switchBlocks = false;
        }else{
          this.cont=0;
          const xFinal = Math.random()*this.canvas.width-80;
          let block1 = new Block(0,xFinal,'green',0,this.canvas);
          let iniciBlock2 = xFinal+80;
          if (iniciBlock2 < 80) {
          iniciBlock2 = 80;
          }
          let block2 = new Block(iniciBlock2,this.canvas.width,'green',0,this.canvas);
          this.blocks2.push(block1);
          this.blocks2.push(block2);
          this.switchBlocks = true;
        }
      }else{
        this.cont=0;
        const xFinal = Math.random()*this.canvas.width-80;
        let block1 = new Block(0,xFinal,'red',0,this.canvas);
        let iniciBlock2 = xFinal+80;
        if (iniciBlock2 < 80) {
         iniciBlock2 = 80;
        }
        let block2 = new Block(iniciBlock2,this.canvas.width,'red',0,this.canvas);
        this.blocks.push(block1);
        this.blocks.push(block2);
      }
      
    }
  
  }

  levelMax(){
    if(this.levelNum === 2 && !this.ball2){
      //this.isLevelMax = true;
      this.ball2 = new Ball(this.canvas,2);
    }
  }

  updateCanvas(){
    this.ball.update();
    if(this.ball2){
      this.ball2.update();
    }
    this.blocks.forEach((block) => {
      block.update(this.level);
    })
    if(this.ball2){
      this.blocks2.forEach((block) => {
        block.update(this.level);
      })
    }
    this.cont = this.cont + this.level;
    this.posY = this.posY + this.level;
  }

  updateScore(){
    if (this.ball.puntuation%4===0 && this.level<2.75){
      if(this.levelBool){
        this.level = this.level+0.25;
        this.levelBool = false;
      }
    }
    if (this.level === 2){
      this.ball.speed = 5;
    }

    switch(this.level){
      case 1: this.levelNum = 1;
      break;
      case 1.25: this.levelNum = 2;
      break;
      case 1.50: this.levelNum = 3;
      break;
      case 1.75: this.levelNum = 4;
      break;
      case 2: this.levelNum = 5;
      break;
      case 2.25: this.levelNum = 6;
      break;
      case 2.50: this.levelNum = 7;
      break;
      case 2.75: this.levelNum = 'MAXIIIMUM!'
      break;
    }
  }

  clearCanvas(){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
  }

  drawCanvas(){
    this.ball.draw();
    if(this.ball2){
      this.ball2.draw();
    }
    this.blocks.forEach((block) => {
      block.draw();
    })
    if(this.ball2){
      this.blocks2.forEach((block) => {
        block.draw();
      })
    }
  }

  destroyBlocks(){
    this.blocks.forEach((block,index) => {
      if(block.posY >= this.canvas.height){
        this.blocks.splice(index,1);
        console.log('Destrooy!');
        this.levelBool = true;
        this.ball.gainPoints(1);
      }
    })
  }

  checkAllCollisions(){
    this.ball.checkScreen();
    if(this.ball2){
      this.ball2.checkScreen();
      this.blocks.forEach((block) => {
        if(this.ball.checkCollisionBlocks(block)){
          console.log('You lose');
          this.cont = 0;
          this.posY = 0;
          this.lose(this.ball.puntuation);
          this.gameIsOver = true;
        }
      })
      this.blocks2.forEach((block) =>{
        if(this.ball2){
          if(this.ball2.checkCollisionBlocks(block)){
            console.log('You lose');
            this.cont = 0;
            this.posY = 0;
            this.lose(this.ball.puntuation);
            this.gameIsOver = true;
          }
        }
      })
    }
    this.blocks.forEach((block) => {
      if(this.ball.checkCollisionBlocks(block)){
        console.log('You lose');
        this.cont = 0;
        this.posY = 0;
        this.lose(this.ball.puntuation);
        this.gameIsOver = true;
      }
    })
  }

  updateDom(callback){
    this.updateDom = callback
  }

  gameOverCallback(callback){
    this.lose = callback;
  }


}
