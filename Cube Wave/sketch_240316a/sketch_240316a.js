let angle = 0;
let w = 24;
let magicAngle;
let maxD;

function setup() {
  createCanvas(400, 400, WEBGL);
  //noCursor();
  magicAngle = atan(1/sqrt(2));
  maxD = dist(0, 0, 200, 200);
}


function draw() {
  background(200);
  //orbitControl(); 
  ortho(-400, 400, -400, 400, -0, 1000);
  translate(0, 0, -500);
 
  rotateX(-QUARTER_PI);
  rotateY(magicAngle);
  
  //translate(width/2, height/2);
  rectMode(CENTER)
  //rotateX(angle * 0.25);
  
  let offset = 0;
  for (let z = 0; z < height; z += w){
    for(let x = 0; x< width; x+= w){
      
    
    //fill(255);
    //ambientMaterial(100);
    //rect(x - width/2 + w/2,0, w - 2, h);
    
    let d = dist(x,z, width/2, height/2);
    let offset = map(d, 0, maxD, -PI, PI);
    let a = angle + offset;
    let h = map(sin(a), -1, 1, 100, 300);
    
    push();
    translate(x - width / 2, 0, z - height / 2);
    normalMaterial();
    shininess(10); 
    
    box(w -2 , h, w - 2);
    pop();
    }
    
    //offset += 0.1;
  }
  
  angle += 0.1;
}
