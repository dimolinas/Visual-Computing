let cellSize = 20;
let dimension = 10;
let delta = cellSize/2;

let font;
let song;
let game;
let factory;

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
  game.init();
}

function draw() {
  background(0);
  setupCamera();

  game.displayBoard();
  game.drawTetrominos();
  game.displayPoints();
  game.update();
}

function keyPressed(){
  game.activeTetromino.keyPressed(keyCode);
}

function setupCamera(){
  orbitControl();
  rectMode(CENTER);
  rotateX(1/2* HALF_PI + 0.2);
  rotateZ(HALF_PI/2);
}
