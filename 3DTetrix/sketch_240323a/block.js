class Block{
  constructor(defaultVel){
    this.pos = createVector(cellSize/2, cellSize/2, dimension * cellSize);
    this.speed = createVector(0, 0, 0);
    this.active = true;
    setTimeout(this.down.bind(this), 1000);
  }
  
  down(){
    print("hello");
    setTimeout(this.down.bind(this), 1000);
    this.pos.z += -cellSize;  
  }
  
  render(){
    push();
    translate(this.pos.x, this.pos.y, this.pos.z + cellSize/2);
    fill(0,0,255);
    box(cellSize);
    pop();
    
    
    print(this.pos.x, this.pos.y, this.pos.z);
    
    push();
    translate(this.pos.x + cellSize , this.pos.y, this.pos.z + cellSize/2);
    box(cellSize);
    pop();
    
    push();
    translate(this.pos.x + 2*cellSize , this.pos.y, this.pos.z + cellSize/2);
    box(cellSize);
    pop();
    
    push();
    translate(this.pos.x + 3*cellSize , this.pos.y, this.pos.z + cellSize/2);
    box(cellSize);
    pop();
  }
  
  dir(x, y, z){
 
    this.speed.x = x;
    this.speed.y = y;
    this.speed.z = z;
  }
  
  update(){
    
    if(this.active)  this.pos.add(this.speed);
    
    this.speed.x = 0;
    this.speed.y = 0;
    
    // Check boundaries
    if (this.pos.x <= 0) {
      this.pos.x = 0;
      this.speed.x = 0;
    } else if (this.pos.x >= hight * cellSize) {
      this.pos.x = hight * cellSize - cellSize;
      this.speed.x = 0;
    }

    if (this.pos.y <= 0) {
      this.pos.y = 0;
      this.speed.y = 0;
    } else if (this.pos.y >= hight * cellSize) {
      this.pos.y = hight * cellSize - cellSize;
      this.speed.y = 0;
    }

    if (this.pos.z <= 0) {
      this.pos.z = 0;
      this.speed.z = 0;
    } else if (this.pos.z >= hight * cellSize) {
      this.pos.z = hight * cellSize - cellSize;
      this.speed.z = 0;
    }
    
    if(this.pos.z === 0) {
      this.active = false;
      this.speed = createVector(0, 0, 0);
    }
  }
}
