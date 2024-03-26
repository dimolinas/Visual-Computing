class Game{
  constructor(){
    this.drawBoard();
    this.play = false;
    this.musicIsPlaying = false;
    
    let buttonPlay = createButton('Play');
    buttonPlay.id('playButton');
    buttonPlay.position(10, 10);
    
    let buttonStop = createButton('Stop');
    buttonStop.id('stopButton');
    buttonStop.position(60, 10);
    
    buttonPlay.mousePressed(this.startGame.bind(this));
    buttonStop.mousePressed(this.stopGame.bind(this));
  }
  
  drawBoard() {
    for (let i=0; i<=hight * scale; i+=scale) {
      push();
      stroke('white')
      line(i, 0, 0, i, 0, scale * 10);
      line(0, i, 0, 0, i, scale * 10);
  
      line(0, 0, i, scale * 10, 0, i);
      line(0, i, 0, scale * 10, i, 0);
  
      line(0, 0, i, 0, scale * 10, i);
      line(i, 0, 0, i, scale * 10, 0);
      pop();
    }
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
      newBlock.dir(scale, 0, defaultVel);
    } else if (keyCode === LEFT_ARROW) {
      newBlock.dir(-scale, 0, defaultVel);
    } else if (keyCode === UP_ARROW) {
      newBlock.dir(0, scale, defaultVel);
    } else if (keyCode === DOWN_ARROW) {
      newBlock.dir(0, -scale, defaultVel);
    }
  }
}
