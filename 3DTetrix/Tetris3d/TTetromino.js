class TTetromino extends Tetromino{
  constructor(colorTetromino){
    super();
    print("TTetromino");
    this.colorCube = colorTetromino;
    this.cells = [ 
      createVector(0, 0, 10),
      createVector(1, 0, 10),
      createVector(2, 0, 10),
      createVector(1, 1, 10),
    ];
  }
}
