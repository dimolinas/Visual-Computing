class LBlock{
  constructor(){
    
    this.delta = cellSize/2;
    this.cells = [ 
      createVector(0, 0, 10),
      createVector(1, 0, 10),
      createVector(2, 0, 10),
      createVector(3, 0, 10)
    ];
    
    setTimeout(this.down.bind(this), 1000);
      
  }
  
  down(){
    setTimeout(this.down.bind(this), 1000);
    for(let cell of this.cells){
      cell.z -= 1;
    }
  }
  
  drawCube(i, j, k){
    push();
    translate(i * cellSize + this.delta, j * cellSize + this.delta, k * cellSize + this.delta);
    box(cellSize);
    pop();
  }
  
  render(){
    for(let cell of this.cells){
      this.drawCube(cell.x, cell.y, cell.z);
    }
  }
}
