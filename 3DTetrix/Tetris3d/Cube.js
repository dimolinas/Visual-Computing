class Cube{
  constructor(){
    this.delta = this.delta = cellSize/2;
  }
  
  drawCube(i, j, k, colorCube){
    push();
    fill(colorCube ? colorCube : '#ffffff');
    translate(i * cellSize + this.delta, j * cellSize + this.delta, k * cellSize + this.delta);
    box(cellSize);
    pop();
  }
}
