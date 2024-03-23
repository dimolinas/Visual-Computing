
let angle = 0;

function setup() {
  createCanvas(680, 480, WEBGL);
  
  //camera = createCamera();
  
}

function draw() {
   background(128);
   // orbitControl();
   
   //camera.setPosition(100, 0, 100);
   //camera.lookAt(0, 50 * sin(angle), 0);
   // camera.setPosition(200* sin(angle), 0, 
   //200* cos(angle));
   
   camera(200* sin(angle), 0, 200* cos(angle), //Pos
          0, 50 * sin(angle), 0, // Look At
          1, 0, 0);
   
   box(50);
   
   translate(0, 0, -50);
   box(100, 100, 10); 
   
   angle += 0.05;
}
