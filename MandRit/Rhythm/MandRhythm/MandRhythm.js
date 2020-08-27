var scale;
var sliderPan;
let petalas = 2;
let radius = 300;

function setup() {
 
  createCanvas(1350, 800);
  noStroke();
     //sliderPan = createSlider(-1, 1, 0, 0.01);

  center = createVector(width/2, height/2);
  maxRadius = min(center.x, center.y) * 0.9;
  
  //minSize *= min(width, height)/1080;
  //colors = [color("#581845"), color("#900C3F"), color("#C70039"), color("#FF5733"), color("#FFC30F")];
 
}

function draw() {
  background("#f2f279");
  
  fill(260,260,242,242);
  noStroke();
  ellipse(center.x, center.y, 580, 580);
  
  fill(250,250,242,242);
  noStroke();
  ellipse(center.x, center.y, 500, 500);
  
  fill(240,240,242,242);
  ellipse(center.x, center.y, 420, 420);
  
  fill(230,230,242,242);
  ellipse(center.x, center.y, 340, 340);
  
  fill(220,220,242,242);
  ellipse(center.x, center.y, 260, 260);
  
  fill(210,210,242,242);
  ellipse(center.x, center.y, 180, 180);
  
  //draw1();
  drawCircles();
  drawLines();
}

 
////////CIRCLES/////////

function drawCircles(){
  translate(width / 2, height / 2);
    stroke(0);
    //strokeWeight();
   
    //middle = width/2;
  
    circles = 60;
    angle = Math.PI*2 / circles;

    radius = 300;
    circleRadius = sin(angle/2) * radius;
   
    for(var i = 0; i < circles; i++){

        xCircle = cos(angle*i) * radius;
        yCircle = sin(angle*i) * radius;
         ellipseMode(CENTER);
        ellipse(xCircle, yCircle, circleRadius*2, circleRadius*2);
    }
}
        
////////LINHAS_RAIOS/////////

function drawLines(){
  //push();
  translate(-300,-300);
  stroke(255);
  points       = 60           //number of points 
  pointAngle   = 360/points; //angle between points
       //length of each line from centre to edge of circle
  
  for (angle=270; angle<630; angle=angle+pointAngle){
    x = cos(radians(angle)) * radius; //convert angle to radians for x and y coordinates
    y = sin(radians(angle)) * radius;
    line(radius, radius, x+radius, y+radius); //draw a line from each point back to the centre
   
  }
}

/*function draw1() {
  push();
  translate(width / 2, height / 2);
 beginShape();
  stroke(1);
  strokeWeight(1/2);
  for(var a = 0; a < TWO_PI; a += 0.02) {
    //quant de petalas a partir de um raio
    //var x = r * cos(a);
    //point(x,y);
    var r = 300 * cos(3 * a);
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x,y);   
}
endShape(CLOSE);
scale.pan(sliderPan.value(vertex));
}*/
