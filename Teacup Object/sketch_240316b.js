let teapot;

function setup() {
  createCanvas(680, 480, WEBGL);
  teapot = loadModel("teapot.obj", true);
}

function draw() {
  background(200);
  orbitControl();
  
  let dirX = (mouseX/ width - 0.5) *2
  let dirY = (mouseY/ width - 0.5) *2
  directionalLight(250, 250, 250, -dirX, -dirY, -1);
  
  ambientLight(100);
  ambientMaterial(50, 0, 250);
  
  specularMaterial(250);
  shininess(50);
  
  
  scale(1.5);
  scale(1,-1);
  rotateY(frameCount/100);
  
  noStroke();
  
  model(teapot);
}
