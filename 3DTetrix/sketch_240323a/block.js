class Block{
  constructor(defaultVel){
    this.pos = createVector(scale/2, scale/2, hight * scale);
    this.speed = createVector(0, 0, 0);
    this.active = true;
    setTimeout(this.down.bind(this), 1000);
  }
  
  down(){
    print("hello");
    setTimeout(this.down.bind(this), 1000);
    this.pos.z += -scale;  
  }
  
  render(){
    push();
    translate(this.pos.x, this.pos.y, this.pos.z + scale/2);
    box(scale);
    pop();
    
    
    print(this.pos.x, this.pos.y, this.pos.z);
    
    push();
    translate(this.pos.x + scale , this.pos.y, this.pos.z + scale/2);
    box(scale);
    pop();
    
    push();
    translate(this.pos.x + 2*scale , this.pos.y, this.pos.z + scale/2);
    box(scale);
    pop();
    
    push();
    translate(this.pos.x + 2*scale , this.pos.y, this.pos.z + scale/2);
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
    
    // Check boundaries
    if (this.pos.x <= 0) {
      this.pos.x = 0;
      this.speed.x = 0;
    } else if (this.pos.x >= hight * scale) {
      this.pos.x = hight * scale - scale;
      this.speed.x = 0;
    }

    if (this.pos.y <= 0) {
      this.pos.y = 0;
      this.speed.y = 0;
    } else if (this.pos.y >= hight * scale) {
      this.pos.y = hight * scale - scale;
      this.speed.y = 0;
    }

    if (this.pos.z <= 0) {
      this.pos.z = 0;
      this.speed.z = 0;
    } else if (this.pos.z >= hight * scale) {
      this.pos.z = hight * scale - scale;
      this.speed.z = 0;
    }
    
    if(this.pos.z === 0) {
      this.active = false;
      this.speed = createVector(0, 0, 0);
    }
  }
}
