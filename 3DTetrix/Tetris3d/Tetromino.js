class Tetromino extends Cube{
  constructor(){
    super();
    this.color = "";
    this.cells = [];
    setTimeout(this.moveBackwardZ.bind(this), 1000);
  }
  
  render(){
    for(let cell of this.cells){
      this.drawCube(cell.x, cell.y, cell.z);
    }
  }
  
  moveBackwardZ(){
    setTimeout(this.moveBackwardZ.bind(this), 1000);
    if(game.play){
      for(let cell of this.cells){
      cell.z -= 1;
      }
    }
  }
  
  moveForwardX(){
    if(game.play){
      for(let cell of this.cells){
      cell.x += 1;
      }
    }
  }
  
  moveBackwardX(){
    if(game.play){
      for(let cell of this.cells){
      cell.x -= 1;
      }
    }
  }
  
  moveForwardY(){
    if(game.play){
      for(let cell of this.cells){
      cell['y'] += 1;
      }
    }
  }
  
  keyPressed(keycode){
    if (keyCode === RIGHT_ARROW) {
      this.moveForwardX();
    } else if (keyCode === LEFT_ARROW) {
      this.moveBackwardX();
    } else if (keyCode === UP_ARROW) {
      this.moveForwardY();
    } else if (keyCode === DOWN_ARROW) {
      newBlock.dir(0, -scale, 0);
    }
  } 
}
