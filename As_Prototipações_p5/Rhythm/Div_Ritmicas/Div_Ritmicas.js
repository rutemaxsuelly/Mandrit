let time = 0;

/*function preload(){
  sound = loadSound('Assets/maracatuatomico.mp3');
}*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  push();
  background(240, 240, 240);
  noStroke();
  
  //sound.play();
  createP('');
  button = createButton('Visualize Ritmos de Percussão');
  button.position(1000, 50);
  button.mousePressed(mouseClicked2);
}


function draw() {
  translate(width / 2, height / 2);
    background(88,22,89);
     noFill();
     push();
     stroke(255);

//verde
stroke(55, 247, 107);
 ellipse(50, -10, 500);
 //vermelha
stroke(247, 55, 55);
 ellipse(50, 90, 300);
 //azul
stroke(4, 102, 195);
 ellipse(50, 190, 100);
stroke(30, 0, 255);
//(x, y, raiox, raioy)
 ellipse(50, 300, 100);
 
 moviment1();
 moviment2();
}

function moviment1() {
      let radius = 250

    let x = radius * cos(time);
    let y = radius * sin(time);
    
    
    noStroke();
    fill(55, 247, 107);
    translate(50, -10);
    ellipse(x, y, 20);
    
    time += 0.01;

}

function moviment2() {
      let radius2 = 150
    
   let x2 = radius2 * cos(time);
    let y2 = radius2 * sin(time);
   
    noStroke();
    fill(247, 55, 55);
    translate(5, 90);
    ellipse(y2, x2, 30);
    
     time += 0.001;
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
//function draw3() {
   //push();
//translate(width / 2, height / 2);
  //fill(237, 34, 10);
  //beginShape();
  //vertex(-100, 100);
  //vertex(0, 350);
  //vertex(100, 100);
  //vertex(350, 0);
  //vertex(100, -80);
  //vertex(0, -350);
  //vertex(-100, -80);
  //vertex(-350, 0);
  //endShape();}
