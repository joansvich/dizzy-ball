'use strict';

class Game {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.ball;
    this.blocks = [];
    this.posY = 0;
    this.cont = 0;
    this.gameIsOver = false;
    this.level = 1;
    this.levelBool = false;
  };


  startLoop(){
    //let posY = 0;
    //let cont = 0;
    this.ball = new Ball(this.canvas);
    const loop = () => {
      if(this.cont>200|| this.cont===0){
        this.cont=0;
        const xFinal = Math.random()*this.canvas.width-40;
        let block1 = new Block(0,xFinal,0,this.canvas);
        let iniciBlock2 = xFinal+40;
        if (iniciBlock2 < 40) {
          iniciBlock2 = 40;
        }
        let block2 = new Block(iniciBlock2,this.canvas.width,0,this.canvas);
        
        this.blocks.push(block1);
        this.blocks.push(block2);
        
      }
      
      this.checkAllCollisions();
      this.updateCanvas(this.posY);
      this.clearCanvas();
      this.drawCanvas();
      this.destroyBlocks();
      this.cont = this.cont + this.level;
      this.posY = this.posY + this.level;
      console.log(this.cont);
      console.log(this.level);
      console.log(this.ball.puntuation);
      if (this.ball.puntuation%4===0&& this.level<2.25){
        if(this.levelBool){
          this.level = this.level+0.25;
          this.levelBool = false;
        }
      }
      if (this.level === 2){
        this.ball.speed = 5;
      }
      if(!this.gameIsOver){
        window.requestAnimationFrame(loop);
      }
    }
    window.requestAnimationFrame(loop);
  }

  updateCanvas(){
    this.ball.update();
    this.blocks.forEach((block) => {
      block.update(this.level);
    })
  }

  clearCanvas(){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
  }

  drawCanvas(){
    this.ball.draw();
    this.blocks.forEach((block) => {
      block.draw();
    })
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
    this.blocks.forEach((block) => {
      if(this.ball.checkCollisionBlocks(block)){
        console.log('You lose');
        this.cont = 0;
        this.posY = 0;
        this.lose();
        this.gameIsOver = true;
      }
    })
  }

  gameOverCallback(callback){
    this.lose = callback;
    
  }


}