function setup() {
  createCanvas(680, 480, WEBGL);
}

function draw() {  
  background(128);
  orbitControl();
  
  translate(-375, 0, 0);
  
  for (let i=0; i < 9; i++) {
    push();
    translate(75*i, 50 * i * sin(frameCount/100), 0);
    box(50);
    pop();
  }
  
}

function keyPressed() {
  if (key === '1') {
    // Left, Right, Bottom, Top, Near, Far
    ortho(-width/2, width/2, height/2, -height/2, 5, 1000);
  } else if (key === '2') {
    // fovy, aspect, Near, Far
    perspective(PI/3, width/height, 5, 1000);
  }
}
