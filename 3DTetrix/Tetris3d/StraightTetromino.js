class StraightTetromino extends Tetromino{
  constructor(){
    super();
    this.colorCube = '#0099FF';
    this.cells = [ 
      createVector(0, 0, 10),
      createVector(1, 0, 10),
      createVector(2, 0, 10),
      createVector(3, 0, 10)
    ];
  }
}
