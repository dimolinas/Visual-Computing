class SquareTetromino extends Tetromino{
  constructor(){
    super();
    this.colorCube = '#ffff00';
    this.cells = [ 
      createVector(0, 0, 10),
      createVector(1, 0, 10),
      createVector(0, 1, 10),
      createVector(1, 1, 10),
      
      createVector(0, 0, 9),
      createVector(1, 0, 9),
      createVector(0, 1, 9),
      createVector(1, 1, 9),
    ];
  }
}
