class Block{
  
  constructor(defaultVel){
    this.pos = createVector(scale/2, scale/2, hight * scale);
    this.speed = createVector(0, 0, defaultVel);
    this.active = true;
  }
  
  render(){
    push();
    translate(this.pos.x, this.pos.y, this.pos.z + scale/2);
    box(scale);
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
    
    if(this.pos.z === 0) {
      this.active = false;
      this.speed = createVector(0, 0, 0);
    }
  }
}
