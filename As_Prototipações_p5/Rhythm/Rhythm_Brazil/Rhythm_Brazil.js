
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
 
   for (var i = 0; i < 100; i++) {
   var x= random(width);
   var y= random(height);
   var r= 5;
   fill(255,0,150,110);
   noStroke();
   ellipse(x,y, r*2, r*2);
   
   //rosa
   fill(84,158,250,110);
   ellipse(x,y, r*3, r*3);
   
   fill(255,0,150,110);
   ellipse(x*2,y*2, r*4, r*4);
   
   fill(84,158,250,110);
   ellipse(y*2,x*2, r*5, r*5); 
  
 }  
 }
 
 
function draw() {
  //background(255);
  //createCanvas(1340, 1080);
   radius = random(width/2-20);
  //line from center
  noFill();
  stroke(201, 225, 255);
  if(random()<0.1){
    strokeWeight(2);
    angle = random(PI*2);
    line(width/2 , height/2, width/2+radius*sin(angle), height/2+radius*cos(angle));
    //fill(84,158,250,110);
    fill(255,0,150,110);
    circle( width/2+radius*sin(angle), height/2+radius*cos(angle), 10);
  }

  stroke(127, 10, 120);
  translate(width/2, height/2);
  
  for (let i = 0; i < 10; i ++) {
    //ellipse(0, 100,100, 400);
    noStroke();
    fill(120, 120, 120);
     ellipse(0, 100,100, 300);
     rotate(PI/1.5);
  }
  //verdinho
   beginShape();
     stroke(180,255,111);
     vertex(0, 200);
     vertex(0, 0);
     fill(180,255,111);
     circle(0,200,10);
   endShape(CLOSE);
   
   //laranjinha1
   beginShape();
     stroke(255,160,5);
     vertex(0, 200);
     vertex(0, 0);
     rotate(PI/1.5);
     fill(255,160,5);
     circle(0,200,10);
     
   endShape(CLOSE);
   
   //laranjinha2
   beginShape();
     stroke(255,160,5);
     vertex(0, 0);
     vertex(0, 200);
     rotate(PI/1.5);
     fill(255,160,5);
     circle(0,200,10);
   endShape(CLOSE);
}
  
