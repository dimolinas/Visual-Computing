class LTetromino extends Tetromino{
  constructor(){
    super();
    this.colorCube = '#ffa500';
    this.cells = [ 
      createVector(0, 0, 10),
      createVector(1, 0, 10),
      createVector(2, 0, 10),
      createVector(2, 0, 11),
    ];
  }
}
