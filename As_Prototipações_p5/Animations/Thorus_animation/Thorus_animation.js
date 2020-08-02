//THORUS DE PONTOS ANIMADOs
//Estudos Processing Rute e Horhanna
// https://www.openprocessing.org/browse/#

var circle = 500;
var rot;
var col;
var freq = 0.000005; 
var cont = 0;
var r;

function setup() {
  createCanvas(1350, 800);
  
}

function draw() {
  background(0);
  translate(700, 350);
  rotate(radians(rot));

 ellipseMode(RADIUS);
  for (var i=0; i<300; i ++) {
    circle= 200 + 100*sin(millis()*freq*i);
    col=map(circle,150,250,255,60);
    r=map(circle,150,250,5,2);
    fill(col,0,250);//250-74
    noStroke();
    ellipse(circle*cos(i), circle*sin(i),r,r);    
    rot=rot+0.00005;
  }
}
