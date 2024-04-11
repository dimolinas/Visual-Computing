class Tetromino extends Cube{
  constructor(){
    super();
    this.colorCube = null;
    this.active = true;
    this.blocked = false;
    this.cells = [];
    setTimeout(this.falling.bind(this), 1000);
  }
  
  render(){
    for(let cell of this.cells){
      this.drawCube(cell.x, cell.y, cell.z, this.colorCube);
    }
  }
  
  falling(){
    setTimeout(this.falling.bind(this), 1000);
     if(this.verifyBackwardBounds('z') && this.active){
       this.moveBackward('z');
     }else{
       if(this.active){
         this.saveInMemory();
         activeTetromino = factory.createRandomTetromino()
         tetrominos.push(activeTetromino);
       }
       this.active = false;
     }
  }
  
  saveInMemory(){
    for(let cell of this.cells){
      game.board.matrix[cell.x][cell.y][cell.z] = 1;
    }
  }
  
  moveBackward(dir){
    if(game.play && this.active){
      for(let cell of this.cells){
      cell[dir] -= 1;
      }
    }
  }
  
  moveForward(dir){
    if(game.play && this.active){
      for(let cell of this.cells){
      cell[dir] += 1;
      }
    }
  }
  
  verifyForwardBounds(dir){
    let able = true;
    if(game.play){
      for(let cell of this.cells){
        if(cell[dir] >= dimension - 1){
          able = false;
        } 
      }
    }
    return able;
  }
  
  verifyBackwardBounds(dir){
    let able = true;
    if(game.play){
      for(let cell of this.cells){
        if(cell[dir] <= 0){
          able = false;
        } 
      }
    }
    return able;
  }
  
  keyPressed(keycode){
    if (keyCode === RIGHT_ARROW) {
      if(this.verifyForwardBounds('x')) this.moveForward('x');
    } else if (keyCode === LEFT_ARROW) {
      if(this.verifyBackwardBounds('x')) this.moveBackward('x');
    } else if (keyCode === UP_ARROW) {
      if(this.verifyForwardBounds('y')) this.moveForward('y');
    } else if (keyCode === DOWN_ARROW) {
      if(this.verifyBackwardBounds('y')) this.moveBackward('y');
    }
  } 
}
