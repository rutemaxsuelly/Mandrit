//Cursor cíclico para acompanhamento musical//
var musica;
var button;
var amp;
let time = 0
let cores=[];


//DIFICULDADE: Em fazer o comprimento da circunferência ter relação com o dado musical//

function setup() {
  createCanvas(1780, 840);
  background(0);
  musica= loadSound("assets/taketakeOK.mp3");
  amp=new p5.Amplitude();
  
  loaded();
  
  //RANGE COR
   cinza= color(199, 200, 203);
 cores.push(cinza);
 cinza.setAlpha(128 + 128 * sin(millis() / 5000));
 
   vermelho = color(140,23,23);
 cores.push(vermelho);
vermelho.setAlpha(128 + 128 * sin(millis() / 5000));

        stroke(255);
        textSize(50);
        text('M A N D R I T', 600, 5800);
}

function loaded(){
  button=createButton("play");     
  button.mousePressed(tocarPlay, animarBola);
  button.size(180,50);
  button.position(20, 400);
}

function draw(){
  
  // Função que é chamada abaixo//
   animarBola();
}

function animarBola() {
    translate(width / 2, height / 2);
     rotate(PI/-2);
  
  var vol=amp.getLevel();
  var diam=map(vol,0,0.3,10,500);
      
    let raio = 340;

    let x = raio * cos(time);
    let y = raio * sin(time);
    
    
    /*stroke(181, 31, 184);
    fill(60, 232, 244); */
    stroke(255);
    fill(0);
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
