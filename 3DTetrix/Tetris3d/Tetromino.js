class Tetromino extends Cube{
  constructor(){
    super();
    this.colorCube = null;
    this.active = true;
    this.cells = [];
    setTimeout(this.moveBackwardZ.bind(this), 1000);
  }
  
  render(){
    for(let cell of this.cells){
      this.drawCube(cell.x, cell.y, cell.z, this.colorCube);
    }
  }
  
  moveBackward(dir){
    if(game.play){
      for(let cell of this.cells){
      cell[dir] -= 1;
      }
    }
  }
  
  moveForward(dir){
    if(game.play){
      for(let cell of this.cells){
      cell[dir] += 1;
      }
    }
  }
  
  moveBackwardZ(){
    setTimeout(this.moveBackwardZ.bind(this), 1000);
     this.moveBackward('z');
  }
  
  keyPressed(keycode){
    if (keyCode === RIGHT_ARROW) {
      this.moveForward('x');
    } else if (keyCode === LEFT_ARROW) {
      this.moveBackward('x');
    } else if (keyCode === UP_ARROW) {
      this.moveForward('y');
    } else if (keyCode === DOWN_ARROW) {
      this.moveBackward('y');
    }
  } 
}
