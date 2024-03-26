let button;

class Game{
  
  constructor(){
    this.drawBoard();
    
    this._play = false;
    this.musicIsPlaying = false;
    
    button = createButton('Play');
    button.id('playButton');
    button.position(10, 10);
    
    button.mousePressed(this.startGame.bind(this));
  }
  
  get play() {
    return this._play;
  }

  set play(value) {
    this._play = value;
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
    print("Start game");
    if(!this.musicIsPlaying){
      this.musicIsPlaying = true;
      song.play();
      song.setVolume(0.8);
    }
    
    this.play = !this.play;
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
