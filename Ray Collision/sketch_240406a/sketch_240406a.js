
const walls = [], nRays=100;
let light;

function setup() {
  createCanvas(640, 480);
  
  for (let i = 0; i < 5; i++) {
    const x1 = random(width);
    const x2 = random(width);
    const y1 = random(height);
    const y2 = random(height);
    walls[i] = new Wall(x1, y1, x2, y2);
  }
  
  walls.push(new Wall(0, 0, width, 0));
  walls.push(new Wall(width, 0, width, height));
  walls.push(new Wall(width, height, 0, height));
  walls.push(new Wall(0, height, 0, 0));
  
  light = new Light();
}

function draw() {
  background(0);
  walls.forEach(w => w.show());
  
  light.update();
  light.show();
}

class Wall {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  show() {
    stroke(255);
    line(this.x1, this.y1, this.x2, this.y2);
  }
  
  normal(){
    const p1 = createVector(this.x1, this.y1);
    const p2 = createVector(this.x2, this.y2);
    return p5.Vector.sub(p1, p2).rotate( HALF_PI).normalize();
  }
}

class Light {
  constructor() {
    this.pos = createVector(0, 0);
    this.rays = [];
    for (let a = 0; a < TWO_PI; a += TWO_PI/nRays) {
      this.rays.push(new Ray(this.pos, a));
    }
  }

  update() {
    this.pos.set(mouseX, mouseY);
  }

  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 20);
    this.rays.forEach(r => r.render(walls));
  }
}

class Ray {
  constructor(pos, angle) {
    this.pos = pos;
    this.dir = p5.Vector.fromAngle(angle);
  }

  render(walls, reflection=true) {
    let closest = null;
    let record = Infinity;
    let hitWall = null;
    for (let wall of walls) {
      const pt = this.cast(wall);
      if (pt) {
        const d = p5.Vector.dist(this.pos, pt);
        if (d < record) {
          record = d;
          closest = pt;
          hitWall = wall;
        }
      }
    }
    
    if (closest) {
      colorMode(HSB);
      stroke(frameCount % 255, 255, 255, 50);
      //stroke(255);
      line(this.pos.x, this.pos.y, closest.x, closest.y);
      
      //2: Reflect the ray if reflections are allowed
      if (!reflection) {
        const normal = hitWall.normal();
        const incident = p5.Vector.sub(closest, this.pos).normalize();
        const reflection = p5.Vector.sub(incident, normal.mult(2).mult(incident.dot(normal)));
        const nextRay = new Ray(closest, reflection.heading());
        nextRay.render(walls, false);
      }
    }
  }

  cast(wall) {
    // https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
    
    const {x1, y1, x2, y2} = wall;

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    // Check if the lines are not parallel
    const denominator = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4);
    if (denominator === 0) {
      return null;
    }

    const t = ((x1-x3)*(y3-y4) - (y1-y3)*(x3-x4)) / denominator;
    const u = ((x1-x3)*(y1-y2) - (y1-y3)*(x1-x2)) / denominator;
    
    if (t >= 0 && t <= 1 && u >= 0) {
      const px = x1 + t * (x2 - x1);
      const py = y1 + t * (y2 - y1);
      return createVector(px, py);
    }
    return null;
  }
}
