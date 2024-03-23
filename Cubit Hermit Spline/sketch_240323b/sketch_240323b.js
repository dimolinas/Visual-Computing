let points = [], detail = 30;

function setup() {
  createCanvas(680, 480);
  
  points.push(createVector(50, 50));
  points.push(createVector(50, 300));
  points.push(createVector(400, 300));
  points.push(createVector(400, 50));
}


function draw() {
  background(128);
  
  fill(255, 0, 0);
  points.forEach(p => ellipse(p.x, p.y, 10, 10));

  points[3].x = mouseX;
  points[3].y = mouseY;

  drawBezier(points[0], points[1], points[2], points[3]);
}

function drawBezier(p0, p1, p2, p3) {
  
  for (let t=0; t<=1; t += 1/detail) {
    const p01x = linear(p0.x, p1.x, t);
    const p12x = linear(p1.x, p2.x, t);
    const p23x = linear(p2.x, p3.x, t);
    
    const p01y = linear(p0.y, p1.y, t);
    const p12y = linear(p1.y, p2.y, t);
    const p23y = linear(p2.y, p3.y, t);
    
    stroke(0);
    line(p01x, p01y, p12x, p12y);
    line(p12x, p12y, p23x, p23y);
    
    const q0x = linear(p01x, p12x, t);
    const q0y = linear(p01y, p12y, t);
    
    const q1x = linear(p12x, p23x, t);
    const q1y = linear(p12y, p23y, t);
    
    fill(0, 0, 255);
    ellipse(q0x, q0y, 10, 10);
    ellipse(q1x, q1y, 10, 10);
    
    stroke(0,255, 0);
    line(q0x, q0y, q1x, q1y);
    
    const x = linear(q0x, q1x, t);
    const y = linear(q0y, q1y, t);
    
    fill(255, 255, 0);
    ellipse(x, y, 10, 10);
    
  }

}

function linear(p0, p1, t) {
  return t * p0 + (1-t) * p1;
}
