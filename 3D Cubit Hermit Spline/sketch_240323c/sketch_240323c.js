let points = [], detail = 10;

function setup() {
  createCanvas(680, 480, WEBGL);
 
  points.push(createVector(-50, -50, 100));
  points.push(createVector(50, 300, -50));
  points.push(createVector(400, 300, 50));
  points.push(createVector(50, 50, 0));
}


function draw() {
  background(128);
  orbitControl();
  
  fill(255, 0, 0);
  points.forEach(p => drawPoint(p, color(255, 0, 0)));
  drawBezier(points[0], points[1], points[2], points[3]);
}

function drawBezier(p0, p1, p2, p3) {
  for (let t=0; t<=1; t += 1/detail) {
    const p01 = linear(p0, p1, t);
    const p12 = linear(p1, p2, t);
    const p23 = linear(p2, p3, t);
    
    drawLine(p01, p12, color(0));
    drawLine(p12, p23, color(0));
    
    const q0 = linear(p01, p12, t); 
    const q1 = linear(p12, p23, t);
    
    drawPoint(q0, color(0, 0, 255));
    drawPoint(q1, color(0, 0, 255));
    
    drawLine(q0, q1, color(0,255,0));
    
    const r = linear(q0, q1, t);
    drawPoint(r, color(255, 255, 0));
  }

}

function linear(p0, p1, t) {
  return createVector(
    t * p0.x + (1-t) * p1.x,
    t * p0.y + (1-t) * p1.y,
    t * p0.z + (1-t) * p1.z
  );
}

function drawPoint(p, col) {
  push();
  noStroke();
  fill(col)
  translate(p.x, p.y);
  sphere(5);
  pop();
}

function drawLine(p0, p1, col) {
  push();
  stroke(col);
  line(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
  pop();
}
