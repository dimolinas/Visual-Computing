let points = [];
let angle = 0;
let factor = 0;

function setup() {
  createCanvas(680, 480, WEBGL);
  rotateX(HALF_PI);
  factor = height/3;
  
  points[0] = [[0] , [0], [1], [0]]; // extreme Z
  
  points[1] = [[1] , [0], [0], [0]];
  points[2] = [[0] , [1], [0], [0]];
  points[3] = [[-1], [0], [0], [0]];
  points[4] = [[0] , [-1], [0], [0]];
  
  points[5] = [[0] , [0], [-1], [0]]; //extreme -Z
  
  points[6] = [[0] , [0], [0], [1]];
  points[7] = [[0] , [0], [0], [-1]];
  
}

function draw() {
  orbitControl();
  rectMode(CENTER);
  rotateX(HALF_PI);
  background(220);
  
  angle += 0.02;
  
  const rotationZW = [
    [cos(angle),   -sin(angle), 0, 0],
    [sin(angle),    cos(angle), 0, 0],
    [         0,             0, 1, 0],
    [         0,             0, 1, 1]
  ];
  
  const rotationXY = [
    [1, 0, 0,                      0],
    [0, 1, 0,                      0],
    [0, 0, cos(angle),   -sin(angle)],
    [0, 0, sin(angle),    cos(angle)]
  ];
  
  let projected = [];
  
  for(let i=0; i<points.length; i++){
    let rotated = matmul(rotationZW, points[i]);
    rotated = matmul(rotationXY, rotated);
    
    const orthographic = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0]
    ];
  
    let distance = 2;
    let w = 1 / (distance-rotated[3])
  
    const perspective = [
      [w, 0, 0, 0],
      [0, w, 0, 0],
      [0, 0, w, 0]
    ];
  
    const projection = perspective;
    
    
    const p = matmul(projection, rotated);
    projected.push([p[0] * factor, p[1] * factor, p[2] * factor]);
  }
  
  for(let i=0; i<points.length;i++){
    if(i==0){
      push();
      stroke(255, 255, 200);//RGB
      strokeWeight(16);
      point(projected[i][0], projected[i][1], projected[i][2]);
      pop();
    }else if(i==1){
      push();
      stroke(0, 0, 255);
      strokeWeight(16);
      point(projected[i][0], projected[i][1], projected[i][2]);
      pop();
    }else if(i==3){
      push();
      stroke(0, 255, 0);
      strokeWeight(16);
      point(projected[i][0], projected[i][1], projected[i][2]);
      pop();
    }else if(i==4){
      push();
      stroke(255, 0, 0);
      strokeWeight(16);
      point(projected[i][0], projected[i][1], projected[i][2]);
      pop();
    }else{
      push();
      stroke(255, 255, 255);
      strokeWeight(16);
      point(projected[i][0], projected[i][1], projected[i][2]);
    }
  }
  
  for(let i=1; i<=4; i++){
    connect(0, i, projected);
    connect(i, (i % 4) +1 , projected);
    connect(5, i, projected);
  }
  
  for(let i=0; i<7; i++){
    connect(i, 6, projected);
  }
  
  for(let i=0; i<7; i++){
    connect(i, 7, projected);
  }
  
}

function connect(i, j, points){
  stroke(255,255,255);
  strokeWeight(2);
  line(points[i][0], points[i][1], points[i][2] , points[j][0] , points[j][1], points[j][2] );
}


function matmul(matrixA, matrixB){
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const rowsB = matrixB.length;
  const colsB = matrixB[0].length;
  
  if(colsA !== rowsB){
    throw new Error("Invalid matrix dimension");
  }
  
  const result = new Array(rowsA).fill().map(() => new Array(colsB).fill(0));
  
  matrixC = [];
  for(let i=0; i<rowsA; i++){
    for(let j=0; j<colsB; j++){
      result[i][j] = 0;
      for(let k=0; k<colsA; k++){
        result[i][j] += matrixA[i][k] * matrixB[k][j];
      }
    }
  }
  
  return result;
}
