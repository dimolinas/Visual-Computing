class Tetromino extends Cube{
  constructor(){
    super();
    this.colorCube = null;
    this.active = true;
    this.blocked = false;
    this.cells = [];
    setTimeout(this.falling.bind(this), game.fallFrecuency);
  }
  
  render(){
    for(let cell of this.cells){
      if(this.active){
        this.drawCube(cell.x, cell.y, cell.z, this.colorCube);
      }
    }
  }
  
  falling(){
    setTimeout(this.falling.bind(this), 1000);
     if(this.verifyBackwardBounds('z') && this.verifyMemory('backwardZ') && this.active){
       this.moveBackward('z');
     }else{
       if(this.active){
         this.saveInMemory();
         game.activeTetromino = factory.createRandomTetromino()
         game.tetrominos.push(game.activeTetromino);
       }
       this.active = false;
     }
  }
  
  saveInMemory(){
    for(let cell of this.cells){
      game.board.matrix[cell.x][cell.y][cell.z].active = true;
      game.board.matrix[cell.x][cell.y][cell.z].colorCube = this.colorCube;
    }
  }
  
  move(dir, increment) {
    if (game.play && this.active) {
        for (let cell of this.cells) {
            cell[dir] += increment;
        }
    }
}
  
  moveBackward(dir){
    this.move(dir, -1);
  }
  
  moveForward(dir){
    this.move(dir, 1);
  }
  
  rotateZ(){
    print("rotateZ");
    if(this.active){
      let angle = HALF_PI;
      for(let cell of this.cells){
        let x = cell.x * cos(angle) - cell.y * sin(angle);
        let y = cell.x * sin(angle) + cell.y * cos(angle);
        cell.x = Math.round(x);
        cell.y = Math.round(y);
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
  
  verifyMemory(direction){
    let able = true;
    if (game.play) {
      for (let cell of this.cells) {
        
        let x = cell.x;
        let y = cell.y;
        let z = cell.z;
        
        switch (direction) {
          case 'forwardX':
            x++;
            break;
          case 'backwardX':
            x--;
            break;
          case 'forwardY':
            y++;
            break;
          case 'backwardY':
            y--;
            break;
          case 'backwardZ':
            z--;
            break;
          default:
            break;
        }
        if(game.board.matrix[x][y][z]?.active === true) {
          able = false;
          break; 
        }
      }
    }
    return able;
  }
  
  keyPressed(keycode){
    if (keyCode === RIGHT_ARROW) {
      if(this.verifyForwardBounds('x') && this.verifyMemory('forwardX')) this.moveForward('x');
    } else if (keyCode === LEFT_ARROW) {
      if(this.verifyBackwardBounds('x') && this.verifyMemory('backwardX')) this.moveBackward('x');
    } else if (keyCode === UP_ARROW) {
      if(this.verifyForwardBounds('y') && this.verifyMemory('forwardY')) this.moveForward('y');
    } else if (keyCode === DOWN_ARROW) {
      if(this.verifyBackwardBounds('y') && this.verifyMemory('backwardY')) this.moveBackward('y');
    } else if (key === 'e'){
      this.rotateZ();
    }
  } 
}
