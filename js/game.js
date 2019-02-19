'use strict';

class Game {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.player;
    this.blocks = [];
    this.blocks2 = [];
    this.enemies = [];
    this.posY = 0;
    this.cont = 0;
    this.gameIsOver = false;
    this.level = 2;
    this.levelNum = 1;
    this.levelBool = false;
    this.switchBlocks = true;
    this.contEnemies = 0;
    this.lives = 3;
    this.body = document.querySelector("body");
    this.gameSong = new Audio('../sounds/song-game.mov');
  };

//<link rel="preload" href="./sounds/goal.mov" as="audio">
  startLoop(){
    this.gameSong.play();
    this.player = new Player(this.canvas,1);

    const loop = () => {

      this.updateDom();
      this.createBlocks();
      this.randomEnemies();
      this.checkAllCollisions();
      this.updateCanvas();
      this.clearCanvas();
      this.drawCanvas();
      this.destroyBlocks();
      this.updateScore();
      if(!this.gameIsOver){
        window.requestAnimationFrame(loop);
      }
    }
    window.requestAnimationFrame(loop);
  }

  createBlocks(){
    if(this.cont>250|| this.cont===0){
      if(this.player2){
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

  randomEnemies() {
    if(this.contEnemies%380===0 && this.contEnemies != 0){
      let posXEnemie = Math.random()*this.canvas.width-40;
      let enemie = new Enemie(posXEnemie,0,this.canvas);
      this.enemies.push(enemie);
    }

    if(this.contEnemies%750===0 && !this.player2 && this.contEnemies != 0){
      this.player2 = new Player(this.canvas,2);
    }
    
    
    if(this.contEnemies>2350){
      this.rotateCanvas(45,3);
      if(this.contEnemies>2650){
        this.rotateCanvas(-45,6);
      }
      if(this.contEnemies>2900){
        this.rotateCanvas(45,6);
      }
      if(this.contEnemies>3200){
        this.rotateCanvas(180,8);
      }
      if(this.contEnemies>4000){
        this.rotateCanvas(0,7);
      }

      if(this.contEnemies>5150){
        this.rotateCanvas(90,4);
      }

      if(this.contEnemies>5730){
        this.rotateCanvas(-90,6);
      }

      if(this.contEnemies>6210){
        this.rotateCanvas(-180,3);
      }

      if(this.contEnemies>7000){
        this.rotateCanvas(0,5);
      }

      if(this.contEnemies>7430){
        this.rotateCanvas(720,15);
      }
    }
  
  }

  rotateCanvas(num,second) {
    this.body.setAttribute("style", ` 
            -webkit-transform: rotate(${num}deg);
            -moz-transform: rotate(${num}deg); 
            -o-transform: rotate(${num}deg);
            -ms-transform: rotate(${num}deg);
            transform: rotate(${num}deg);
            transition-duration: ${second}s;
        `);
  }

  initialRotate() {
    this.body.removeAttribute("style");
  }

  updateCanvas(){
    this.player.update();
    if(this.player2){
      this.player2.update();
    }
    this.blocks.forEach((block) => {
      block.update(this.level);
    })
    if(this.player2){
      this.blocks2.forEach((block) => {
        block.update(this.level);
      })
    }
    if(this.enemies.length>0){
      this.enemies.forEach((enemie) => {
        enemie.update();
      })
    }
    this.cont = this.cont + this.level;
    this.posY = this.posY + this.level;
    this.contEnemies++;
    console.log(this.contEnemies);
  }

  updateScore(){
    if (this.player.puntuation%6===0 && this.level<3.75){
      if(this.levelBool){
        console.log(this.levelBool);
        console.log(this.level);
        this.level = this.level+0.25;
        this.levelNum++;
        this.levelBool = false;
      }
    }
    if(this.levelNum>=3){
      this.player.speed === 7;
      this.player2.speed === 7;
    }

  }

  clearCanvas(){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
  }

  drawCanvas(){
    this.player.draw();
    if(this.player2){
      this.player2.draw();
    }
    this.blocks.forEach((block) => {
      block.draw();
    })
    if(this.player2){
      this.blocks2.forEach((block) => {
        block.draw();
      })
    }
    if(this.enemies.length>0){
      this.enemies.forEach((enemie) => {
        enemie.draw();
      })
    }
  }

  destroyBlocks(){
    this.blocks.forEach((block,index) => {
      if(block.posY >= this.canvas.height){
        this.blocks.splice(index,1);
        console.log('Destrooy!');
        this.levelBool = true;
        this.player.gainPoints(1);
      }
    })
  }

  checkAllCollisions(){
    this.player.checkScreen();
    if(this.player2){
      this.player2.checkScreen();
      this.blocks.forEach((block) => {
        if(this.player.checkCollisionBlocks(block)){
          this.resetGameOnLose();
        }
      })
      this.blocks2.forEach((block) =>{
        if(this.player2){
          if(this.player2.checkCollisionBlocks(block)){
            this.resetGameOnLose();
          }
        }
      })
    }
    this.blocks.forEach((block) => {
      if(this.player.checkCollisionBlocks(block)){
        this.resetGameOnLose();
      }
    })
    this.enemies.forEach((enemie,index) => {
      if(this.player.checkCollisionKnife(enemie)){
        this.enemies.splice(index,1);
        this.player.gainPoints(-2);
        console.log('Knife damn');
      }
    })
  }

  updateDom(callback){
    this.updateDom = callback
  }

  gameOverCallback(callback){
    
    this.lose = callback;
  }

  resetGameOnLose(){
    this.gameSong.pause();
    this.isLevelMax = false;
    this.cont = 0;
    this.posY = 0;
    this.lose(this.player.puntuation);
    this.gameIsOver = true;
  }

}
