class Board extends Cube{
  constructor(){
    super();
    this.matrix = this.create3dCubeMatrix();
    //setTimeout(this.applyGravity.bind(this), 1000);
  }
  
  applyGravity(){
    //setTimeout(this.applyGravity.bind(this), game.fallFrecuency);
    for(let k = 1; k < dimension; k++){
      for(let i = 0; i < dimension; i++){
        for(let j = 0; j < dimension; j++){
          if(this.matrix[i][j][k].active && !this.matrix[i][j][k-1].active){
            this.matrix[i][j][k-1] = this.matrix[i][j][k];
            this.matrix[i][j][k] = new Cube();
            this.matrix[i][j][k].active = false;
            this.matrix[i][j][k-1].active = true;
          }
        }
      }
    }
  }
  
  verifyCubeInLayer(k){
    let isCube = false;
      for(let i = 0; i < dimension; i++){
        for(let j = 0; j < dimension; j++){
          if(this.matrix[i][j][k].active){
            return true;
          }
        }
      }
      return isCube;
  }
  
  verifyIsLayerComplete(k){
    let layerComplete = true;
      for(let i = 0; i < dimension; i++){
        for(let j = 0; j < dimension; j++){
          if(!this.matrix[i][j][k].active){
            return false;
          }
        }
      }
      return layerComplete;
  }
  
  cleanLayer(k){
    for(let i = 0; i < dimension; i++){
      for(let j = 0; j < dimension; j++){
        this.matrix[i][j][k].active = false;
      }
    }
  }
  
  drawCubes(){
    for(let i = 0; i < this.matrix.length; i++){
      for(let j = 0; j < this.matrix[i].length; j++){
        for(let k = 0; k < this.matrix[i][j].length; k++){
          if(this.matrix[i][j][k].active === true){
            this.matrix[i][j][k].drawCube(i, j, k);
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
    
  create3dCubeMatrix(){
    return Array.from({ length: dimension }, () =>
      Array.from({ length: dimension }, () => 
        Array.from({ length: dimension + 2 }, () => new Cube())
      ));
  }  
}
