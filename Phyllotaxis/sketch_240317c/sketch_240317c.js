const c = 6;
let n = 1;
let start = 0;

function setup() {
  createCanvas(640, 360);
  angleMode(DEGREES);
  colorMode(HSB);
}

function draw() {
  background(0);
  noStroke();
  translate(width / 2, height / 2);
  
  rotate(n * 0.3); // 3
  
  for (let i = 0; i <= n; i++) {
    const a = i * 137.5;
    const r = c * sqrt(i);
    const x = r * cos(a);
    const y = r * sin(a);
    
    let hu = sin(start + i * 0.1); // 2
    hu = map(hu, -1, 1, 0, 360); // 2
    fill(hu, 255, 255); // 2
    
    ellipse(x, y, c+1, c+1);
  }
  n += 5;
  start += 0.1;
}
