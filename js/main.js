'use strict';

const main = () => {
  
  const buildDom = (html) => {
    const main = document.querySelector('main');
    main.innerHTML = html;
    return main;
  };


  const buildSplashScreen = () => {
    const splashScreen = buildDom(`
    
      <img id="logo" src="./images/logo.png">
      <button id="startButton"><span>Start</span></button>
      <button id="rulesButton"><span>Rules</span></button>
    
    `);
    const startButton = document.querySelector('#startButton');
    startButton.addEventListener('click',buildGameScreen);

    const rulesButton = document.querySelector('#rulesButton');
    rulesButton.addEventListener('click',buildRulesScreen);
  };

  const buildGameScreen = () => {
    const gameScreen = buildDom(`
      <section class="game-screen">
        <div class="info-text">
          <p class="score-text">Score: </p><p class="score-num">0</p>
        </div>
        <canvas></canvas>
        <div id="button-on-mobile"><button id="btLeft"></button><button id="btRight"></button></div>
      </section>
    `);
    console.log('GameScreen');
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
      scoreNum.innerHTML = game.player.puntuation;
    }
    
  
    
    const setPlayerDirection = (event) => {
      console.log('hi');
      if (event.code === 'ArrowLeft'){
        game.player.setDirection(-1);
      }
      if (event.code === 'ArrowRight'){
        game.player.setDirection(1);
      }
      if(event.code === 'Space'){
        alert('PAUSE');
      }
      if(game.player2) {
        if (event.code === 'KeyA'){
          game.player2.setDirection(-1);
        }
        if (event.code === 'KeyD'){
          game.player2.setDirection(1);
        }
      }
    }
    const setPlayerDirectionToZero = (event) =>{
      console.log(event.code)
      if(event.code === 'ArrowLeft'||event.code === 'ArrowRight'){
        game.player.setDirection(0);
      }
      if(event.code === 'KeyA' || event.code === 'KeyD'){
        if(game.player2){
          game.player2.setDirection(0);
        }
      }
    }  
    const moveLeft = () => {
      game.player.setDirection(-1);
    }
    const moveRight = () => {
      game.player.setDirection(1);
    }
    const moveToZero = () => {
      game.player.setDirection(0);
    }

    document.addEventListener('keydown',setPlayerDirection);
    document.addEventListener('keyup',setPlayerDirectionToZero);
    const btLeft = document.querySelector('#btLeft');
    btLeft.addEventListener('touchstart',moveLeft);
    btLeft.addEventListener('touchend',moveToZero);
    const btRight = document.querySelector('#btRight');
    btRight.addEventListener('touchstart',moveRight);
    btRight.addEventListener('touchend',moveToZero);
    
  };
  
  const buildGameOver = (score) => {
    const gameOver = buildDom(`
    <div id="rules">
      <h1>Game Over</h1> 
      <p>Your Score: </p><p class="score-num">0</p>
      <button><span>Restart</span></button>
    </div>
    `);
    let scoreNum = document.querySelector('.score-num');
    scoreNum.innerHTML = score;
    const restartButton = document.querySelector('button');
    restartButton.addEventListener('click',buildGameScreen);
  }

  const buildRulesScreen = () => {
    const rulesScreen = buildDom(`
    <div id="rules">
      <section>
        <h1>Rules</h1>
      </section>
      <section>
        <div>
          <p><span>OBJETIVO: </span></p>
          <p>Llegar lo más lejos sin colisionar contra los bloques</p>
        </div>
      </section>
      <section>
        <div>
          <p><span>CONTROLES:</span></p>
          <ul>
            <li>Flechas derecha e izquierda para mover el personaje pepinillo</li>
            <li>Letras A y D para mover el personaje berenjena</li>
          </ul>
        </div>
      </section>
      <section>
        <div>
          <p><span>COMPLICACIONES</span></p>
          <ul>
            <li>El personaje pepinillo es inmune a los bloques lilas</li>
            <li>El personaje berenjena es inmune a los bloques rojos</li>
            <li>Los cuchillos restan 2 puntos</li>
          </ul>
        </div>
      </section>
      <button id="initialButton"><span>Inicio</span></button>
    </div>
    `);
    const container = document.querySelector('.container');
    const initialButton = document.querySelector('#initialButton');
    initialButton.addEventListener('click',buildSplashScreen);
    container.remo
  }

  buildSplashScreen();

}

window.addEventListener('load',main);