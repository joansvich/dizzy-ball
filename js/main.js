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
        <canvas></canvas>
      </section>
    `);
    console.log('GameScreen');
      setInterval(buildGameOver,3000);

    const width = document.querySelector('.game-screen').offsetWidth;
    const height = document.querySelector('.game-screen').offsetHeight;
    const canvasElement = document.querySelector('canvas');
    canvasElement.setAttribute('width',width);
    canvasElement.setAttribute('height',height);

    

  };

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

  


  buildSplashScreen();

}

window.addEventListener('load',main);