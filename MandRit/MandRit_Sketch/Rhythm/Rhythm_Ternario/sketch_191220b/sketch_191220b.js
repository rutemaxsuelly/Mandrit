//COMPASSO TERNÁRIO MANDRIT

let button = 100;

function preload(){
  sound = loadSound('Assets/002_CompassoTernario.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  amplitude = new p5.Amplitude();
  sound.play();
  background(0);
  createP('');
  button = createButton('Visualize Ritmos de Percussão');
  button.position(1000, 50);
  button.mousePressed(mouseClicked2);
  
  background(88,22,89);
  fill(0);
   noStroke();
  circle(width/2, height/2, 280, 280);
  
   // noFill();
  //stroke(0);
 // triangle(680,0, 300, 300, 1000, 300);
  
}
function draw() {
  
  //background(255,300,150);
  //fill(255);
  //circle(width/2, height/2, 400, 400);
  //fill(255);
  //triangle(800, 400, 1000, 700, 1200, 400);
  //Desenha um loop junto com a amplitude da música;
  let level = amplitude.getLevel();
  let size = map(level, 0, 1, 0, 200);
//Batida01 - 
  fill(255,300,150);
  stroke(255);
  circle(700, 500, 50, 50);
  fill(255,300,150);
  circle(700, 500, size, size);
  
//batida02 - azul
  fill(0);
  circle(440, 200, 50, 50);
  fill(4, 102, 195);
  circle(440, 200, size, size);
//Batida03 - vermelho
  fill(0);
  circle(950, 200, 50, 50);
  fill(100,0,0);
  circle(950, 200, size, size);
  
  noFill();
  stroke(255);
  //x1,y1, x2,y2, x3,y3
  triangle(440, 200, 700, 500, 950, 200);
  

}
function mouseClicked(){
  mouseClicked1();
  mouseClicked2();
}

function mouseClicked1(){
 let val1 =  sound.play();
 background(val1);
}
function mouseClicked2(){
 let val2 =  sound.stop();
}
