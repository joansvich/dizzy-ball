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
    //const xball = this.Ball.x;
    const loop = () => {
      if(cont%60===0 || cont===0){
        console.log(cont);
        /*const xFinal = Math.random()*canvas.width-ball.width;
        let block1 = new Block(0,xFinal);
        let iniciBlock2 = xFinal+ball.length;
        let block2 = new Block(iniciBlock2,canvas.width)
        
        this.blocks.push(block1);
        this.blocks.push(block2);*/
        
      }

      this.checkAllCollisions();
      this.updateCanvas(/*posY*/);
      this.clearCanvas();
      this.drawCanvas();
      cont++;
      window.requestAnimationFrame(loop);
    }
    
    window.requestAnimationFrame(loop);
  }

  updateCanvas(/*posY*/){
    this.ball.update();
    /*this.blocks.forEach((block) => {
      block.update(posY);
    })*/
  }

  clearCanvas(){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
  }

  drawCanvas(){
    this.ball.draw();
    /*this.blocks.forEach((block) => {
      block.draw();
    })*/
  }

  checkAllCollisions(){
    this.ball.checkScreen();
  }


}