let on = false;
let on2 = false;
let cores = [];

function setup() {
  createCanvas(1800, 860);
  
 cinza= color(216);
 cores.push(cinza);
 cinza.setAlpha(128 + 128 * sin(millis() / 5000));
}

function draw() {
  let square = {
    //posição
    x: (width / 3 - 2, width / 3 + 2),
    y: (height / 3 - 2, height / 3 + 2),
    w: width / 20,
    h: height / 20,
    
    x2: (width / 6 - 2, width / 6 + 2),
    y2: (height / 6 - 2, height / 6 + 2),
    w2: width /20,
    h2: height / 20,
  }

  background(255);
  
  //draw a rectangle
  noStroke();
  fill(252,229,229);
  circle(square.x, square.y, square.w, square.h);
  circle(square.x2, square.y2, square.w2, square.h2);
  
  //let the rectangle pop when mouse is inside of it
  if (mouseX > width / 3 && mouseX < width / 2 && mouseY > height / 3 && mouseY < height / 2) {
    square.x = width / 3;
    square.y = height / 3; square.w = square.w * 2
    square.h = square.h * 2
    
        square.x2 = width / 3;
    square.y2= height / 3; square.w = square.w * 2
    square.h2 = square.h * 2
  }
  
  //define "on"
  if (on) {
    noStroke();
    fill(cinza);
    rect(width / 3, height / 3, width / 3, height / 3);
   
        noStroke();
        fill(0);
        textSize(20);
    text('Acompanhe o relógio 1,2,3,4', width / 2, height / 2,);
  }
  
    //define "on"
  if (on2) {
    noStroke();
    fill(cinza);
    rect(width /6, height /6, width / 6, height / 6);
    
        noStroke();
        fill(0);
        textSize(20);
    text('Acompanhe o relógio 1,2,3,4', width/6 , height/6 );
  }
}

function mousePressed() {
  mousePressed1();
  mousePressed2();
}

function mousePressed1() {
  
//light up the rectangle when clicking inside of it
  if (mouseX > width / 3 && mouseX < width / 3 * 2 && mouseY > height / 3 && mouseY < height / 3 * 2) {
    on = !on
  }
}

function mousePressed2() {
    if (mouseX > width / 6 && mouseX < width / 6 * 2 && mouseY > height /6 && mouseY < height / 6 * 2) {
    on2 = !on2
  }
}
