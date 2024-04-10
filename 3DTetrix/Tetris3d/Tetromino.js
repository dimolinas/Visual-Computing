class Tetromino extends Cube{
  constructor(){
    super();
    this.color = "";
    this.cells = [];
    setTimeout(this.down.bind(this), 1000);
  }
  
  render(){
    for(let cell of this.cells){
      this.drawCube(cell.x, cell.y, cell.z);
    }
  }
  
  down(){
    setTimeout(this.down.bind(this), 1000);
    for(let cell of this.cells){
      cell.z -= 1;
    }
  }
  
}
