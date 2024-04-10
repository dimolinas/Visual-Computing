class Board extends Cube{
  constructor(){
    super();
    this.matrix = this.create3dMatrix();
    
    this.matrix[0][0][0] = 1;
    this.matrix[0][7][6] = 1;
    this.matrix[1][1][1] = 1;
  }
  
  draw(){
    for(let i = 0; i < this.matrix.length; i++){
      for(let j = 0; j < this.matrix[i].length; j++){
        for(let k = 0; k < this.matrix[i][j].length; k++){
          if(this.matrix[i][j][k] === 1){
            super.drawCube(i, j, k);
          }
        }
      }
    }
  }
  
  
  drawLines() {
    for (let i=0; i<= dimension * cellSize; i+=cellSize) {
      push();
      stroke('white');
      line(i, 0, 0, i, 0, cellSize * dimension);
      line(0, i, 0, 0, i, cellSize * dimension);
  
      line(0, 0, i, cellSize * dimension, 0, i);
      line(0, i, 0, cellSize * dimension, i, 0);
      
      line(0, 0, i, 0, cellSize * dimension, i);
      line(i, 0, 0, i, cellSize * dimension, 0);
      pop();
    }
  }
    
  create3dMatrix(){
    return Array.from({ length: dimension }, () =>
      Array.from({ length: dimension }, () => 
        Array.from({ length: dimension }, () => 0)
      ));
  } 
     
}
