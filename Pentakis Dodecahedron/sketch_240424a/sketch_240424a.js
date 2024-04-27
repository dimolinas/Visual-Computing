let vertices = [];
const factor = 100;

function setup() {
  createCanvas(680, 480, WEBGL);
  
  const phi = (1 + sqrt(5)) / 2; // Golden ratio
  
  // Vertices of the icosahedron
  let icosahedronVertices = [
    createVector(0, 1, phi),
    createVector(0, -1, phi),
    createVector(0, 1, -phi),
    createVector(0, -1, -phi),
    createVector(1, phi, 0),
    createVector(-1, phi, 0),
    createVector(1, -phi, 0),
    createVector(-1, -phi, 0),
    createVector(phi, 0, 1),
    createVector(-phi, 0, 1),
    createVector(phi, 0, -1),
    createVector(-phi, 0, -1)
  ];
  
  // Vertices of the dodecahedron
  let dodecahedronVertices = [
    createVector(1, 1, 1),
    createVector(1, 1, -1),
    createVector(1, -1, 1),
    createVector(1, -1, -1),
    createVector(-1, 1, 1),
    createVector(-1, 1, -1),
    createVector(-1, -1, 1),
    createVector(-1, -1, -1),
    createVector(phi, 1/phi, 0),
    createVector(-phi, 1/phi, 0),
    createVector(phi, -1/phi, 0),
    createVector(-phi, -1/phi, 0),
    createVector(0, phi, 1/phi),
    createVector(0, -phi, 1/phi),
    createVector(0, phi, -1/phi),
    createVector(0, -phi, -1/phi),
    createVector(1/phi, 0, phi),
    createVector(-1/phi, 0, phi),
    createVector(1/phi, 0, -phi),
    createVector(-1/phi, 0, -phi)
  ];
  
  // Combine vertices
  vertices = icosahedronVertices.concat(dodecahedronVertices);
}

function draw() {
  background(128);
  orbitControl();
  
  strokeWeight(1);
  stroke(0);
  
  for(let i=0; i<vertices.length; i++){
    push();
    stroke(255);
    strokeWeight(10);
    point(vertices[i].x * factor, vertices[i].y * factor, vertices[i].z * factor);
    pop();
  }
  
  // Connect vertices to draw the pentakis dodecahedron
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      let v1 = vertices[i];
      let v2 = vertices[j];
      push();
      strokeWeight(1);
      line(v1.x * factor, v1.y * factor, v1.z * factor, v2.x * factor, v2.y * factor, v2.z * factor);
      pop();
    }
  }
}
