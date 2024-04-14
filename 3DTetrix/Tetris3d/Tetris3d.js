let cellSize = 20;
let dimension = 10;
let delta = cellSize/2;

let timeFrecuency = 1000;

let font;
let song;
let game;
let factory;

let activeTetromino = null;
let tetrominos = [];

function preload() {
  font = loadFont('assets/Tetris.ttf');
  soundFormats('mp3', 'ogg');
  song = loadSound('assets/music.mp3', () => {
    song.onended(restartMusic);
  });
}

function restartMusic() {
  if (game.play) {
    song.play();
  } else {
    song.stop();
  }
}

function setup() {
  createCanvas(600, 800, WEBGL);
  game = new Game();
  factory = new TetrominoFactory();
  activeTetromino = factory.createRandomTetromino()
  tetrominos.push(activeTetromino);
}

function draw() {
  background(0);
  setupCamera();

  game.displayBoard();
  game.displayPoints();
  game.update();
  
  drawTetrominos();
}

function keyPressed(){
  activeTetromino.keyPressed(keyCode);
}

function drawTetrominos(){
  for(let tetromino of tetrominos){
    tetromino.render();
  }
}

function setupCamera(){
  orbitControl();
  rectMode(CENTER);
  rotateX(1/2* HALF_PI + 0.2);
  rotateZ(HALF_PI/2);
}
