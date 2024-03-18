function setup() {
  createCanvas(680, 480);
}

function draw() {
  background(200);

  strokeWeight(5);

  beginShape();
  vertex(30, 20);
  vertex(70, 20);
  vertex(70, 70);
  vertex(30, 70);
  endShape();

  translate(100, 0);
  beginShape();
  vertex(30, 20);
  vertex(70, 20);
  vertex(70, 70);
  vertex(30, 70);
  endShape(CLOSE);

  translate(100, 0);
  beginShape(POINTS);
  vertex(30, 20);
  vertex(70, 20);
  vertex(70, 70);
  vertex(30, 70);
  endShape();

  translate(100, 0);
  beginShape(LINES);
  vertex(30, 20);
  vertex(70, 20);
  vertex(70, 70);
  vertex(30, 70);
  endShape();

  translate(100, 0);
  beginShape(LINES);
  vertex(30, 20);
  vertex(70, 20);
  vertex(70, 20);
  vertex(70, 70);
  vertex(70, 70);
  vertex(30, 70);
  vertex(30, 70);
  endShape(CLOSE);

  translate(-400, 100);
  beginShape(TRIANGLES);
  vertex(30, 20);
  vertex(30, 70);
  vertex(70, 20);
  vertex(70, 70);
  vertex(110, 20);
  vertex(110, 70);
  vertex(150, 20);
  vertex(150, 70);
  vertex(190, 20);
  endShape();

  translate(0, 100);
  beginShape(TRIANGLE_STRIP);
  vertex(30, 20);
  vertex(30, 70);
  vertex(70, 20);
  vertex(70, 70);
  vertex(110, 20);
  vertex(110, 70);
  vertex(150, 20);
  vertex(150, 70);
  vertex(190, 20);
  endShape();

  translate(0, 100);
  beginShape(QUADS);
  vertex(30, 20);
  vertex(70, 20);
  vertex(70, 70);
  vertex(30, 70);
  vertex(110, 20);
  vertex(150, 20);
  vertex(150, 70);
  vertex(110, 70);
  vertex(190, 20);
  endShape();


  //CLOCKWISE
  translate(0, 100);
  beginShape(QUAD_STRIP);
  vertex(30, 20);
  vertex(70, 20);
  vertex(70, 70);
  vertex(30, 70);
  vertex(110, 20);
  vertex(150, 20);
  vertex(150, 70);
  vertex(110, 70);
  vertex(190, 20);
  endShape();

  translate(150, 0);
  beginShape(QUAD_STRIP);
  vertex(30, 20);
  vertex(30, 70);
  vertex(70, 20);
  vertex(70, 70);
  vertex(110, 20);
  vertex(110, 70);
  vertex(150, 20);
  vertex(150, 70);
  vertex(190, 20);
  endShape();
}
