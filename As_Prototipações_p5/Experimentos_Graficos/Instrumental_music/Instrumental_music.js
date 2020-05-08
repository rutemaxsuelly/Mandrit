//VISUALIZAÇÕES POR INSTRUMENTOS 


function setup() {
  createCanvas(1780, 840);
}

function draw() {
  background(255);
  noStroke();
  CENTER;
  translate(width/2,height/2);
  rotate(PI/10);
  fill(0,150,240,100);
  drawLiq(185,50,30,10);
  fill(255,255,255);
  drawLiq(85,60,25,80);
  fill(240,240,0,100);
  drawLiq(85,60,25,80);
  fill(245,0,240,80);
  drawLiq(135,45,20,40);
  fill(0);
  drawLiq(30,40,10,30);
  
}

function drawLiq(num,nm,sm,fcm){
  push();
  //rotate(.5*frameCount/fcm);
  //let dist = TWO_PI/num;  **com50ficoulegalajustar
  let dist = TWO_PI/3;
  beginShape();
  for(let i = 0; i  < num + 3; i++){
    let onda = i % num;
    let rad = dist * onda;
    let r = sm/30*height*0.4 + noise(frameCount/nm + onda) * height*0.1 + sin(frameCount/sm + onda)*height*0.05;
    curveVertex(cos(rad)*r * 1.3, sin(rad)*r);
  }
  endShape();
  pop();
}

function mousePressed(){
  save('pix.jpg');
}
