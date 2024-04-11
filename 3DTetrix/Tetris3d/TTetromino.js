class TTetromino extends Tetromino{
  constructor(){
    super();
    this.colorCube = '#800080';
    this.cells = [ 
      createVector(0, 0, 10),
      createVector(1, 0, 10),
      createVector(2, 0, 10),
      createVector(1, 1, 10),
    ];
  }
}
