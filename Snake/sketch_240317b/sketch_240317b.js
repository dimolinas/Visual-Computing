// Init script
// Init grid logic
// Create snake object
// Add keyboard interactions
// Add food
// Eat food
// Getting longer after eating food
// Death

let scl = 20, cols, rows, snake, food;

function setup() {
  frameRate(10);
  createCanvas(400, 400);
  
  cols = floor(width / scl);
  rows = floor(height / scl);
  
  snake = new Snake();
  pickLocation();
}

function pickLocation() {
  food = createVector(
    floor(random(cols)),
    floor(random(rows))
  );
}

function draw() {
  background(51);
  snake.update();
  snake.show();
  
  fill(255, 0, 100);
  rect(food.x * scl, food.y * scl, scl, scl);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    snake.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    snake.dir(-1, 0);
  } else if (key === 'r') {
    snake = new Snake();
    loop();
  }
}

class Snake {
  
  constructor(){
    this.pos = createVector(0, 0);
    this.speed = createVector(1, 0);
    this.length = 0;
    this.tail = [];
  }

  eat(pos) {
    if (this.pos.equals(pos)) {
      this.length++;
      return true;
    } else {
      return false;
    }
  }

  dir(x, y) {
    if (x != -this.speed.x || y != -this.speed.y) {
      this.speed.x = x;
      this.speed.y = y;
    }
  }

  isDeath() {
    if (this.pos.x < 0 || this.pos.x >= cols ||
        this.pos.y < 0 || this.pos.y >= rows) {
      return true;
    }
    
    for(const pos of this.tail) {
      if (this.pos.equals(pos)) {
        return true;
      }
    }
    
    return false;
  }

  update() {
    this.tail.push(createVector(this.pos.x, this.pos.y));
    if (this.tail.length > this.length){
      this.tail.shift()  
    }
    
    this.pos.add(this.speed);
    
    if (this.eat(food)) {
      pickLocation();
    }
    
    if (this.isDeath()){
      noLoop();
    }
  }

  show() {
    fill(150, 220, 0);
    this.tail.forEach(
      body => rect(body.x * scl, body.y * scl, scl, scl)
    );
    rect(this.pos.x * scl, this.pos.y * scl, scl, scl);
  }
}
