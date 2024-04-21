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
    if(this.active){
      
      let angle = HALF_PI;
      let centroid = this.calculateCentroid('Z');
      let newCells = [];
      
      for(let cell of this.cells){
        
        let x = cell.x - centroid.x;
        let y = cell.y - centroid.y;
        
        let rotatedX = x * cos(angle) - y * sin(angle);
        let rotatedY = x * sin(angle) + y * cos(angle);
        
        let newX = Math.round(rotatedX + centroid.x);
        let newY = Math.round(rotatedY + centroid.y);
        
        if(this.isWithBounds(newX, newY, cell.z)){
          newCells.push(createVector(newX, newY, cell.z));
        }else{
          return;
        }
      }
      this.cells = newCells;
    } 
  }
  
  rotateX(){
    if(this.active){
      
      let angle = HALF_PI;
      let centroid = this.calculateCentroid('X');
      let newCells = [];
      
      for(let cell of this.cells){
        
        let y = cell.y - centroid.y;
        let z = cell.z - centroid.z;
        
        let rotatedY = y * cos(angle) - z * sin(angle);
        let rotatedZ = y * sin(angle) + z * cos(angle);
        
        let newY = Math.round(rotatedY + centroid.y);
        let newZ = Math.round(rotatedZ + centroid.z);
        
        if(this.isWithBounds(cell.x, newY, newZ)){
          newCells.push(createVector(cell.x, newY, newZ));
        }else{
          return;
        }
      }
      this.cells = newCells;
    } 
  }
  
  rotateY(){
    if(this.active){
      
      let angle = HALF_PI;
      let centroid = this.calculateCentroid('Y');
      let newCells = [];
      
      for(let cell of this.cells){
        
        let x = cell.x - centroid.x;
        let z = cell.z - centroid.z;
        
        let rotatedX = x * cos(angle) + z * sin(angle);
        let rotatedZ = -x * sin(angle) + z * cos(angle);
        
        let newX = Math.round(rotatedX + centroid.x);
        let newZ = Math.round(rotatedZ + centroid.z);
        
        if(this.isWithBounds(newX, cell.y, newZ)){
          newCells.push(createVector(newX, cell.y, newZ));
        }else{
          return;
        }
      }
      this.cells = newCells;
    } 
  }
  
  isWithBounds(x, y, z){
    return x >= 0 && x < dimension && y >= 0 && y < dimension && z >= 0 && z < dimension;  
  }
  
  calculateCentroid(axis){
    let sumX = 0;
    let sumY = 0;
    let sumZ = 0;
    
    const lengthCells = this.cells.length;
    
    for(let cell of this.cells){
      sumX += cell.x;
      sumY += cell.y;
      sumZ += cell.z;
    }
    
    let centerX = sumX / lengthCells;
    let centerY = sumY / lengthCells;
    let centerZ = sumZ / lengthCells;
    
    switch(axis){
      case 'X':
        return createVector(centerX, Math.round(centerY), Math.round(centerZ));
      case 'Y':
        return createVector(Math.round(centerX), centerY, Math.round(centerZ));
      case 'Z':
        return createVector(Math.round(centerX), Math.round(centerY), centerZ);
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
    }else if (key === 'w'){
      this.rotateY();
    }else if (key === 'q'){
      this.rotateX();
    }
  } 
}
