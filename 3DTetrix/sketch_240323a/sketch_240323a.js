let cellSize = 20;
let dimension = 10;
let defaultVel = -0.2;

let font;
let song;
let game;
let newBlock;

function preload() {
  font = loadFont('Tetris.ttf');
  soundFormats('mp3', 'ogg');
  song = loadSound('music.mp3', () => {
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
  newBlock = new Block(defaultVel);
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
  
  if(game.play){
    newBlock.update();
    print(newBlock.pos.x, newBlock.pos.y);
  }
  
  newBlock.render();

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
  game.keyPressed(keyCode);
}
