//COMPASSO TERNÁRIO MANDRIT

let button = 100;

function preload(){
  sound = loadSound('Assets/002_CompassoTernario.mp3');
}
function setup() {
  amplitude = new p5.Amplitude();
  sound.play();
  background(0);
  createCanvas(windowWidth, windowHeight);
  button = createButton('Visualize Ritmos');
  button.position(1000, 100);
  button.mousePressed(mouseClicked2);
}
function draw() {
  
  background(255,300,100);
  //fill(255);
  //triangle(800, 400, 1000, 700, 1200, 400);
  //Desenha um loop junto com a amplitude da música;
  let level = amplitude.getLevel();
  let size = map(level, 0, 1, 0, 200);
  //fundo1
  fill(0);
  circle(1300, 450, 100, 100);
  fill(255,300,100);
  circle(1300, 450, size, size);
  //fundo2
  fill(0);
  circle(800, 450, 100, 100);
  fill(100,0,0);
  circle(800, 450, size, size);
  //fundo3
  fill(0);
  circle(width/2, 800, 100, 100);
  fill(100,0,0);
  circle(width/2, 800, size, size);
  
  fill(255);
  noStroke();
  triangle(800, 450, 1025, 810, 1300, 450);
  
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
