class Game{
  constructor(){
    this.play = false;
    this.musicIsPlaying = false;
    
    this.defaultVelZ = -0.2;
    this.points = 100;
    
    this.displayButtons();
    this.board = new Board();
  }
  
  displayButtons(){
    let buttonPlay = createButton('Play');
    buttonPlay.id('playButton');
    buttonPlay.position(10, 10);
    
    let buttonStop = createButton('Stop');
    buttonStop.id('stopButton');
    buttonStop.position(60, 10);
    
    buttonPlay.mousePressed(this.startGame.bind(this));
    buttonStop.mousePressed(this.stopGame.bind(this));
  }
  
  displayPoints() {
    push();
    textSize(24);
    textFont(font);
    text(`Points: ${this.points}`, 150, 230, 230);
    pop();
  }
  
  displayBoard(){
    this.board.drawLines();
    this.board.draw();
  }
  
  startGame() {
    if(!this.musicIsPlaying){
      this.musicIsPlaying = true;
      song.play();
      song.setVolume(0.8);
    }
    this.play = true;
  }
  
  stopGame(){
   if(this.musicIsPlaying){
      song.stop();
      this.play = false;
      this.musicIsPlaying = false;
    }
  }
    
  keyPressed(keycode){
    if (keyCode === RIGHT_ARROW) {
      newBlock.dir(scale, 0, 0);
    } else if (keyCode === LEFT_ARROW) {
      newBlock.dir(-scale, 0, 0);
    } else if (keyCode === UP_ARROW) {
      newBlock.dir(0, scale, 0);
    } else if (keyCode === DOWN_ARROW) {
      newBlock.dir(0, -scale, 0);
    }
  }
}
