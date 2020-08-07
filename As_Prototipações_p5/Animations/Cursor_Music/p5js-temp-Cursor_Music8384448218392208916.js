//---VARIABLES 
var counterCircle = 0;
var amp;
var soundInfo = [];
var music;
var button;

//---SETUP FUNCTION
function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  colorMode(HSB);
  frameRate(15);
  music = loadSound('Assets/Dance_Monkey.mp3', loaded);
  amp = new p5.Amplitude();
  amp.getLevel();
}

function loaded(){
  button=createButton("play");     
  button.mousePressed(togglePlaying);
}

//---DRAW FUNCTIOn
function draw() {
   background(142+amp.getLevel(), 80, 60,80);
  wowWow();
  wowWow(r);
  wowWow(2*r);
  wowWow(0.5*r);
}
//
function wowWow(bee) {
  scale(bee);
  drawCircle(200);
}
  //---CIRCLE FUNCTIONS
//
function drawCircle( q, moveX, moveY) {
  push();
  //amp.setInput(audio);
  var vol = amp.getLevel();
  //fill(60,78,100);
  soundInfo.push(vol);
  strokeWeight(10);
  stroke(random(92,130),30,100);
  noFill();
  translate(400, 400);
  translate(moveX,moveY);
  beginShape();
  for (var i = 0; i < 360; i++) {
    r = map(soundInfo[i], 0, 1, 0, 1000) + q
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();

  if (soundInfo.length > 360) {
    soundInfo.splice(0, 1);              //may possibly need to add in a push/pop to rereset the input for every soundInfo
  }
  pop();
  
  function togglePlaying(){
  if(!music.isPlaying()){
    
  music.play();
  music.setVolume(0.3);
  button.html("stop");
  }else {
  music.pause();
  button.html("play");
    }
  
  } 
}


//---KEY INTERACTION FUNCTION
function keyPressed() {
  if (keyCode === 81) {
    //roomMates.playMode('restart');
    //roomMates.play();
    music.loop();
  }
  if (keyCode === 87) {
    music.stop();
  }
}
 
