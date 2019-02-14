'use strict';

class Game {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.ball;
    this.blocks = [];

  };


  startLoop(){
    let posY = 0;
    let cont = 0;
    this.ball = new Ball(this.canvas);
    const loop = () => {
      if(cont%90===0 || cont===0){
        console.log(cont);
        const xFinal = Math.random()*this.canvas.width-40;
        let block1 = new Block(0,xFinal,0,this.canvas);
        let iniciBlock2 = xFinal+40;
        if (iniciBlock2 < 0) {
          iniciBlock2 = 0;
        }
        let block2 = new Block(iniciBlock2,this.canvas.width,0,this.canvas);
        
        this.blocks.push(block1);
        this.blocks.push(block2);
        
      }
      
      this.checkAllCollisions();
      this.updateCanvas(posY);
      this.clearCanvas();
      this.drawCanvas();
      cont++;
      posY++;
      window.requestAnimationFrame(loop);
    }
    
    window.requestAnimationFrame(loop);
  }

  updateCanvas(){
    this.ball.update();
    this.blocks.forEach((block) => {
      block.update();
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

  checkAllCollisions(){
    this.ball.checkScreen();
    this.blocks.forEach((block) => {
      if(this.ball.checkCollisionBlocks(block)){
        this.ball.lose();
      }
    })
  }


}