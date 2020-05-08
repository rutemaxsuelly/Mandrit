//COBRINHAA

var t;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200);
  r = 255;
  g = 0;
  b = 0;
  timer = 0;
  t = 0;
  colorChange = false;
}

function complementary(vals){
  var compRed = Math.abs(255 - vals[0]);
  var compGreen = Math.abs(255 - vals[1]);
  var compBlue = Math.abs(255 - vals[2]);
  return color(compRed, compGreen, compBlue);
}


function draw() {
  stroke(0,0,0);
  var x = width * noise(t);
  var y = height * noise(t+5);
  r = 255 * noise(t+10);
  g = 255 * noise(t+15);
  b = 255 * noise(t+20);
  
  let normCol = color(r, g, b);
  let compCol = complementary([r, g, b]);
  let activeColor = color(0,0,0);
  
  if(colorChange) {
    activeColor = normCol;
  }
  else {
    activeColor = compCol;
  }
  
  if(timer % 10 === 0) {
    colorChange = !colorChange;
  }
  
  fill(activeColor)
  ellipse(x, y, 120, 120);
  timer = timer + .5;
  t = t + 0.01;
}
