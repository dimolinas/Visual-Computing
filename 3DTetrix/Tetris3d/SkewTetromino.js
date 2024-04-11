class SkewTetromino extends Tetromino{
  constructor(){
    super();
    this.colorCube = '#ff0000';
    this.cells = [ 
      createVector(0, 1, 10),
      createVector(1, 1, 10),
      createVector(1, 0, 10),
      createVector(2, 0, 10),
    ];
  }
}
