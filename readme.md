# Vegetables Party

## Descripción

Se trata de un juego donde el objetivo será conseguir la máxima puntuación en función de la máxima distancia conseguida y la cantidad de estrellas que consigas. También habrá algunas estrellas bonus donde darán propiedades extra.

## MVP - Tecnología (DOM - CANVAS)

Que la bola llegue a la máxima distancia posible sin colisionar con los objetos.

## Backlog

- Añadir estrellas para ir subiendo la puntuación.
- Añadir estrella verde para ser inmune a los bloques

## Estructuras de Datos

**Clases**

- Main
- Game
- Player
- Blocks
- Stars

**Métodos**

- Main
  - buildDom()
  - buildSplashScreen()
  - buildGameScreen()
  - buildGameOver()
- Game
  - startLoop()
  - updateCanvas()
  - clearCanvas()
  - drawCanvas()
  - checkCollisions()
- Player
  - update()
  - draw()
  - setDirection()
- Blocks
  - update()
  - draw()
- Stars
  - update()
  - draw()

## States y States Transitions

Definicion del las transiciones del juego y del main.

- splashScreen
  - Al iniciar el juego saldrá.
- gameScreen
  - Podrás acceder mediante el botón start
- gameoverScreen
  - En cuanto colisiones con un bloque irás directamente.

## Task

- Crear Archivos
- Crear Pantallas
- Transiciones entre pantallas
- Definir clases
- Game: Loops
- Crear Blocks
- Colisiones
- Lógica jugador
- Crear Jugador
- Crear movimiento blocks
- Estrellas
- Niveles

## Links

### Trello

[Link url](https://trello.com)

### Git

Especificar las url del proyecto y del deploy

[Link Repositorio](http://github.com)

[Link Deploy](https://joansvich.github.io/vegetables-party/)

### Slides.com

Especificar la url de la presentacion

[Link Slides.com](http://slides.com)

## Instrucciones del juego 

Al finalizar el juego generar las instrucciones
