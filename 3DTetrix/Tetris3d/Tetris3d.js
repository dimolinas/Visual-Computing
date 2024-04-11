let cellSize = 20;
let dimension = 10;

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
  newTest = factory.createRandomTetromino();
}

function setupCamera(){
  orbitControl();
  rectMode(CENTER);
  rotateX(1/2* HALF_PI + 0.2);
  rotateZ(HALF_PI/2);
}

function draw() {
  background(0);
  setupCamera();

  game.displayBoard();
  game.displayPoints();

  newTest.render();

  push();
  stroke('white');
  line(0, 0, 0, 0, 0, 400);
  stroke('red');
  line(0, 0, 0, 0, 400, 0);
  stroke('green');
  line(0, 0, 0, 400, 0, 0);
  pop();
 
}

function keyPressed(){
  newTest.keyPressed(keyCode);
}
