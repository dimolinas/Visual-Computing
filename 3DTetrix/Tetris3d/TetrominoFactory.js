class TetrominoFactory{
  constructor(){
    this.colors = ['#ffa500', '#ff0000', '#ffff00', '#0099FF', '#800080']
  }
  
  createRandomTetromino(){
    const choose = Math.floor(Math.random() * 5);
    const colorTetromino = this.colors[Math.floor(Math.random() * 5)];
   
    switch(choose){
      case 0:
        return new LTetromino(colorTetromino);
      case 1:
        return new SkewTetromino(colorTetromino);
      case 2:
        return new SquareTetromino(colorTetromino);
      case 3:
        return new StraightTetromino(colorTetromino);
      case 4:
        return new TTetromino(colorTetromino);
    }   
  }
}
