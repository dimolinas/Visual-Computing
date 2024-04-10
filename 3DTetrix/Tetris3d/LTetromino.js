class LTetromino extends Tetromino{
  constructor(){
    super();
    this.cells = [ 
      createVector(0, 0, 10),
      createVector(1, 0, 10),
      createVector(2, 0, 10),
      createVector(2, 0, 11),
    ];
  }
}
