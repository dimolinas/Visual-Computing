let points = [], detail = 100;

function setup() {
  createCanvas(680, 480);
}


function draw() {
  background(128);
  
  fill(255, 0, 0);
  points.forEach(p => ellipse(p.x, p.y, 10, 10));
  
  for (let i=0; i < points.length; i++) {
    const p0 = points[i];
    const p1 = points[(i+1) % points.length];
    const p2 = points[(i+2) % points.length];
    const p3 = points[(i+3) % points.length];
    
    drawLine(p0, p1, p2, p3);
  }
  
}

function drawLine(p0, p1, p2, p3) {
  const v0 = createVector(
    (p2.x - p0.x) / 2,
    (p2.y - p0.y) / 2);
    
  const v1 = createVector(
    (p3.x - p1.x) / 2,
    (p3.y - p1.y) / 2);
  
  for (let t=0; t<=1; t+=1/detail){
    const t2 = t*t;
    const t3 = t2*t;
    
    const H0 =  2*t3 - 3*t2     + 1;
    const H1 = -2*t3 + 3*t2        ;
    const H2 =    t3 - 2*t2 + t    ;
    const H3 =    t3 -   t2        ;
    
    const x = H0*p1.x + H1*p2.x +
              H2*v0.x + H3*v1.x;
    const y = H0*p1.y + H1*p2.y +
              H2*v0.y + H3*v1.y;

    fill(255, 255, 255);
    ellipse(x, y, 10, 10);
    
  }
}


function mousePressed() {
  const p = createVector(mouseX, mouseY);
  points.push(p);
}
