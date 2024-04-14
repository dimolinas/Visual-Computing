class Cube{
  constructor(){
    this.active = false;
    this.colorCube = '';
  }
  
  drawCube(i, j, k){
    push();
    fill(this.colorCube ? this.colorCube : '#ffffff');
    translate(i * cellSize + delta, j * cellSize + delta, k * cellSize + delta);
    box(cellSize);
    pop();
  }
}
