var song;
var amp;
var button;

var volhistory = [];


function preload() {
  song = loadSound('assets/ASABRANCA.mp3');
  
}

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();
  amp = new p5.Amplitude();
}

function draw() {
  background(0);
  var vol = amp.getLevel();
  volhistory.push(vol);
  stroke(158, 41, 255);
  noFill();

  translate(width / 2, height / 2);
  beginShape();
  for (var i = 0; i < 360; i++) {
    var r =  map(volhistory[i], 0, 1, 10, 800);
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();
 
  if (volhistory.length > 360) {
    volhistory.splice(0, 1);
  }
  //ellipse(100, 100, 200, vol * 200);
}
