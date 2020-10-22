//COMPASSO QUATERNARIO MANDRIT

let button = 100;

function preload(){
  sound = loadSound('Assets/compassoQuaternario.mp3');
  //Bachianinhaquaternario
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  amplitude = new p5.Amplitude();
  sound.play();
  background(0);
  createP('');
  button = createButton('Visualize Ritmos');
  button.position(800, 50);
  button.mousePressed(mouseClicked2);
  
  background(88,22,89);
  fill(0);
   noStroke();
  circle(width/2, height/2, 280, 280);
  
  
}
function draw() {
  
  //background(255,300,150);
  //fill(255);
  //circle(width/2, height/2, 400, 400);
  //fill(255);
  //triangle(800, 400, 1000, 700, 1200, 400);
  //Desenha um loop junto com a amplitude da música;
  let level = amplitude.getLevel();
  let size = map(level, 0, 1, 0, 300);
  //Batida01 - amarelo
  fill(0);
  stroke(0);
  circle(700, 550, 50, 50);
  fill(255,300,150);
  circle(700, 550, size, size);
  //batida02 - azul
  fill(0);
  circle(440, 320, 50, 50);
  fill(4, 102, 195);
  circle(440, 320, size, size);
  //Batida03 - vermelho
  fill(0);
  circle(950, 320, 50, 50);
  fill(100,0,0);
  circle(950, 320, size, size);
  //Batita04 - verdin
  fill(0);
  circle(700, 100, 90, 90);
  fill(69, 111,116);
  circle(700, 100, size, size);
  
  
  noFill();
  stroke(255);
  //x1,y1, x2,y2, x3,y3
  //quad(665, 350, 910, 700, 1160, 350, 500, 700);
  quad(950, 320, 440, 320, 700, 550, 700, 100);
  

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
