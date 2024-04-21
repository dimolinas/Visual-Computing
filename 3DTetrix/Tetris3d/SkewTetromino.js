class SkewTetromino extends Tetromino{
  constructor(colorTetromino){
    super();
    this.colorCube = colorTetromino;
    this.cells = [ 
      createVector(0, 1, 10),
      createVector(1, 1, 10),
      createVector(1, 0, 10),
      createVector(2, 0, 10),
    ];
  }
}
