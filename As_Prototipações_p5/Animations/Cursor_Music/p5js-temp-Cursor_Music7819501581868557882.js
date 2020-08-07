var musica;
var button;
var amp;
let time = 0

function setup() {
  createCanvas(1700, 800);
  background(255);
  musica= loadSound("assets/Dance_Monkey.mp3",loaded);
  amp=new p5.Amplitude();
}
function loaded(){
  button=createButton("play");     
  button.mousePressed(tocarPlay);
}

function draw(){
  
   animarBola();
}

function animarBola() {
    translate(width / 2, height / 2);
     rotate(PI/-2);
  
  var vol=amp.getLevel();
  var diam=map(vol,0,0.3,10,200);
      
    let raio = 340

    let x = raio * cos(time);
    let y = raio * sin(time);
    
    
    stroke(0);
    fill(55, 247, 107);
    // translate(50, -10);
    ellipse(x,y,diam,diam);
    
    time += 0.01;

}

function tocarPlay(){
  if(!musica.isPlaying()){
    
  musica.play();
  musica.setVolume(0.3);
  button.html("stop");
}else {
  musica.pause();
  button.html("play");
}

}
