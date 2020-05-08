//Circulo sonoro
//Visualizando Oscilador
// Contém um envelope com som de ataque, decaimento, sustentação e release.
// Base https://www.openprocessing.org/sketch/742076

let minSize = 100;
let colors;
let points = []
let center;
let scaleArray = [48, 50, 52, 53, 55, 57, 59, 60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79, 81, 83, 84];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(40);
  textAlign(CENTER, CENTER);
  noStroke();
  
  center = createVector(width/2, height/2);
  maxRadius = min(center.x, center.y) * 2;
  
  minSize *= min(width, height)/1080;
  
  colors = [color("#581845"), color("#900C3F"), color("#C70039"), color("#FF5733"), color("#FFC30F")];
}

function add(){
  let v = createVector(mouseX, mouseY);
    
  //avoid add inside other
  for(let j = 0; j < points.length; j++){
    if(v.dist(points[j].pos) < minSize){
      return;
    }
  }
  
  //avoid add too close to the border
  if(v.dist(center) > maxRadius - minSize * 2)
    return;

  //sound
  let osc = new p5.SinOsc();
  let envelope = new p5.Envelope();
  envelope.setRange(0.07, 0);//attackLevel, releaseLevel
  envelope.setADSR(0.001, 0.5, 0.1, 0.5);//attackTime, decayTime, sustainRatio, releaseTime

  points.push({
    pos: v.copy(),
    size: minSize,
    growDir: 1,
    collide: false,
    played: false,
    playedTime: 0,
    envelope: envelope,
    osc: osc,
  });
}

function draw() {
  background("#1a0633");
  fill(0);
  ellipse(center.x, center.y, maxRadius*4, maxRadius*4);
  
  if(points.length==0){
    fill(255);
    text("CLICK TO START", center.x, center.y);
    return;
  }
  
  let curTime = millis();
  
  //update
  for(let i = 0; i < points.length; i++){
    let d1 = points[i].pos;
    let s1 = points[i].size;
    let growPct = map(s1, minSize, maxRadius, 0, 1, true);
    
    //sound
    points[i].played = false;
    if(points[i].collide){
      points[i].collide = false;
      if(curTime - points[i].playedTime > 500){
        points[i].played = true;
        points[i].playedTime = curTime;
        
        let midiValue = scaleArray[floor((1-growPct) * (scaleArray.length-1))];
        let freqValue = midiToFreq(midiValue);
        points[i].osc.freq(freqValue);
        points[i].osc.start();
        points[i].envelope.play(points[i].osc, 0, 0.1);
      }
    }
    
    //distance from others
    for(let j = 0; j < points.length; j++){
      if(i == j) continue;
      let d2 = points[j].pos;
      let r = (s1 + points[j].size) * 0.5;
      if(d1.dist(d2) < r){
        points[i].collide = true;
      }
    }
    
    //circular constrain
    if(d1.dist(center) > maxRadius - s1/2){
      points[i].collide = true;
    }
    
    if(points[i].collide || s1 < minSize) points[i].growDir *= -1;
    points[i].size += points[i].growDir * 2;
    
    //draw
    fill(points[i].played ? 255 : lerpColors(growPct, colors));
    ellipse(points[i].pos.x, points[i].pos.y, points[i].size*2, points[i].size*2);
    rect(points[i].pos.x, points[i].pos.y, points[i].size, points[i].size);
    //ellipse(points[i].pos.x, points[i].pos.y, points[i].size, points[i].size);
    //rect(points[i].pos.x*0.5, points[i].pos.y*0.5, points[i].size, points[i].size);
  }
}

function mousePressed(){
  add();  
}

/**
 * lerp color from multiple color array
 * param {Integer} [t] lerp factor from 0 to 1
 * param {Array} [[color, color]] colors to lerp, minimum 2 colors in array
 */
function lerpColors(t, colors)
{
  let i = Math.floor(t*(colors.length-1));
  if(i < 0) return colors[0];
  if(i >= colors.length-1) return colors[colors.length-1];

  let percent = (t - i / (colors.length-1)) * (colors.length-1);
  return color(
    colors[i]._getRed() + percent*(colors[i+1]._getRed()-colors[i]._getRed()),
    colors[i]._getGreen() + percent*(colors[i+1]._getGreen()-colors[i]._getGreen()),
    colors[i]._getBlue() + percent*(colors[i+1]._getBlue()-colors[i]._getBlue())
  )
}
