'use strict';

const main = () => {
  
  const buildDom = (html) => {
    const main = document.querySelector('main');
    main.innerHTML = html;
    return main;
  };


  const buildSplashScreen = () => {
    const splashScreen = buildDom(`
      <h1>Dizzy Ball</h1>
      <button><span>Start</span></button>
    `);
    const startButton = document.querySelector('button');
    startButton.addEventListener('click',buildGameScreen);
  };

  const buildGameScreen = () => {
    const gameScreen = buildDom(`
      <section class="game-screen">
        <div class="info-text">
          <p class="score-text">Score: </p><p class="score-num">0</p>
          <p class="level-text">Level: </p><p class="level-num">0</p>
        </div>
        <canvas></canvas>
      </section>
    `);
    console.log('GameScreen');
    //setInterval(buildGameOver,3000);

    const width = document.querySelector('.game-screen').offsetWidth;
    const height = document.querySelector('.game-screen').offsetHeight;
    const canvasElement = document.querySelector('canvas');
    canvasElement.setAttribute('width',width);
    canvasElement.setAttribute('height',height);
    let body = document.querySelector("body");
    body.removeAttribute("style");
    const game = new Game(canvasElement);
    game.gameOverCallback(buildGameOver);
    game.updateDom(updateDom)
    game.startLoop();
    function updateDom(){
      let scoreNum = document.querySelector('.score-num');
      let levelNum = document.querySelector('.level-num');
      levelNum.innerHTML = game.levelNum;
      scoreNum.innerHTML = game.ball.puntuation;
    }
    
    
    const setPlayerDirection = (event) => {
      if (event.code === 'ArrowLeft'){
        game.ball.setDirection(-1);
      }
      if (event.code === 'ArrowRight'){
        game.ball.setDirection(1);
      }
      if(event.code === 'Space'){
        alert('PAUSE');
      }
      if(game.ball2) {
        if (event.code === 'KeyA'){
          game.ball2.setDirection(-1);
        }
        if (event.code === 'KeyD'){
          game.ball2.setDirection(1);
        }
      }
    }
    const setPlayerDirectionToZero = (event) =>{
      console.log(event.code)
      if(event.code === 'ArrowLeft'||event.code === 'ArrowRight'){
        game.ball.setDirection(0);
      }
      if(event.code === 'KeyA' || event.code === 'KeyD'){
        if(game.ball2){
          game.ball2.setDirection(0);
        }
      }
    }
    document.addEventListener('keydown',setPlayerDirection);
    document.addEventListener('keyup',setPlayerDirectionToZero);
  };
  buildSplashScreen();
  const buildGameOver = (score) => {
    const gameOver = buildDom(`
      <h1>Game Over</h1> 
      <p>Your Score: </p><p class="score-num">0</p>
      <button><span>Restart</span></button>
    `);
    let scoreNum = document.querySelector('.score-num');
    scoreNum.innerHTML = score;
    const restartButton = document.querySelector('button');
    restartButton.addEventListener('click',buildGameScreen);
  }

}

window.addEventListener('load',main);