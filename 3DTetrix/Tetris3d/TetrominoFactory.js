class TetrominoFactory{
  constructor(){}
  
  createRandomTetromino(){
    const choose = Math.floor(Math.random() * 4);
    
    switch(choose){
      case 0:
        return new LTetromino();
      case 1:
        return new SkewTetromino();
      case 2:
        return new SquareTetromino();
      case 3:
        return new StraightTetromino();
      case 4:
        return new TTetromino();
    }   
  }
}
