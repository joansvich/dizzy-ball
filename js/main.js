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
      <button>Start</button>
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

    let scoreNum = document.querySelector('score-num');
    

    const width = document.querySelector('.game-screen').offsetWidth;
    const height = document.querySelector('.game-screen').offsetHeight;
    const canvasElement = document.querySelector('canvas');
    canvasElement.setAttribute('width',width);
    canvasElement.setAttribute('height',height);

    const game = new Game(canvasElement);
    game.gameOverCallback(buildGameOver);
    game.startLoop();
    
    const setPlayerDirection = (event) => {
      console.log(event);
      if (event.code === 'ArrowLeft'){
        game.ball.setDirection(-1);
      }
      if (event.code === 'ArrowRight'){
        game.ball.setDirection(1);
      }
      if(event.code === 'Space'){
        alert('PAUSE');
      }
    }
    const setPlayerDirectionToZero = () =>{
      game.ball.setDirection(0);
    }
    document.addEventListener('keydown',setPlayerDirection);
    document.addEventListener('keyup',setPlayerDirectionToZero);
  };
  buildSplashScreen();
  const buildGameOver = () => {
    const gameOver = buildDom(`
      <h1>Game</h1> 
      <h1>Over</h1>
      <p>Your Score: </p><p>0</p>
      <button>Restart</button>
    `);
    console.log('Game Over');
    const restartButton = document.querySelector('button');
    restartButton.addEventListener('click',buildGameScreen);
  }

}

window.addEventListener('load',main);