class Board{
  constructor(){
    this.matrix = this.create3dMatrix();
    this.delta = cellSize/2;
    
    this.matrix[0][0][0] = 1;
    this.matrix[0][7][6] = 1;
    this.matrix[1][1][1] = 1;
  }
  
  draw(){
    for(let i = 0; i < this.matrix.length; i++){
      for(let j = 0; j < this.matrix[i].length; j++){
        for(let k = 0; k < this.matrix[i][j].length; k++){
          if(this.matrix[i][j][k] === 1){
            this.drawCube(i, j, k);
          }
        }
      }
    }
  }
  
  drawCube(i, j, k){
    push();
    translate(i * cellSize + this.delta, j * cellSize + this.delta, k * cellSize + this.delta);
    box(cellSize);
    pop();
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
