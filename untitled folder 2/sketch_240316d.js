// https://codeshare.io/xL8eod

let cols, rows, scl=10, terrain;

function setup() {
  createCanvas(680, 480, WEBGL);
  rows = floor(height / scl) + 5;
  cols = floor(width / scl);
}

function draw() {
  background(200);
  rotateX(PI/3);
  translate(-width/2, -height/2);
  
  terrain =
    Array(rows).fill().map(
      () => Array(cols + 1).fill(0)
    );
    
  
  let yoff = - frameCount / 100;
  for (let i=0; i<terrain.length; i++){
    let xoff = 0;
    for (let j=0; j<terrain[0].length; j++){
      terrain[i][j] =
        map(noise(xoff, yoff),
            0, 1, -100, 100);
      xoff += 0.1;
    }
    yoff += 0.1;
  }
  
  let dirX = (mouseX/width -0.5) * 2;
  let dirY = (mouseY/width -0.5) * 2;
  directionalLight(250, 250, 200);
  
  ambientLight(200);
  ambientMaterial(0, 50, 200);
  
  specularMaterial(250);
  shininess(50);
  
  //lights();
  stroke(200);
  fill(0,50, 200, 128);
  
  for(let y=0; y<rows-1; y++){
    beginShape(TRIANGLE_STRIP);
    for(let x=0; x<=cols; x++){
      vertex(x*scl, y*scl,
             terrain[y][x]);
      vertex(x*scl, (y+1)*scl,
             terrain[y+1][x]);
    }
    endShape();
  }
  
}
