//CIRCUFERENCIAS CIRCUSCRITAS

let time = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  push();
  background(240, 240, 240);
  noStroke();
}


function draw() {
  translate(200, 200);
    background(0);
     noFill();
     push();
    let radius = 100
    stroke(255);
    fill(255);
    
       var x1= random(width);
   var y1= random(height);
   var r= 48;

    let x = radius * cos(time);
    let y = radius * sin(time);
    
     translate(500,100);
   noStroke();
   fill(214,45,45);
   ellipse(x, y, radius * 4);
   
   ellipse(-x, y, radius * 3);

   ellipse(-y, -y, radius * 3);
  
   fill(152,232,255);
   ellipse(-x, -y, radius*2);
   fill(255,248,36);
   ellipse(-x, -x, r*2 );
   fill(75,255,115);
   ellipse(-y, -y, r );
  
   stroke(255);
   fill(10,0,74);
    ellipse(x, y, 20);
    noFill();
    ellipse(x, y, 30);
    ellipse(x, y, 40);
    ellipse(x, y, 50);
    
       fill(10,0,74);
    ellipse(-x, y, 20);
    noFill();
    ellipse(-x, y, 30);
    ellipse(-x, y, 40);
    ellipse(-x, y, 50);
    
           fill(10,0,74);
    ellipse(-x, -y, 20);
    noFill();
    ellipse(-x, -y, 30);
    ellipse(-x, -y, 40);
    ellipse(-x, -y, 50);
    
    fill(10,0,74);
        ellipse(x, x, 20);
        noFill();
        ellipse(x, x, 30);
        ellipse(x, x, 40);
        ellipse(x, x, 50);
        
            fill(10,0,74);
        ellipse(-x, x, 20);
        noFill();
        ellipse(-x, x, 30);
        ellipse(-x, x, 40);
        ellipse(-x, x, 50);
    
                fill(10,0,74);
        ellipse(-x, -x, 20);
        noFill();
        ellipse(-x, -x, 30);
        ellipse(-x, -x, 40);
        ellipse(-x, -x, 50);
        
    fill(10,0,74);  
     ellipse(y, x, 20);
     noFill();
    ellipse(y, x, 30);
    ellipse(y, x, 40);    
    ellipse(y, x, 50);
    
        fill(10,0,74);  
     ellipse(-y, x, 20);
     noFill();
    ellipse(-y, x, 30);
    ellipse(-y, x, 40);    
    ellipse(-y, x, 50);
    
        fill(10,0,74);  
     ellipse(-y, -x, 20);
     noFill();
    ellipse(-y,-x, 30);
    ellipse(-y, -x, 40);    
    ellipse(-y, -x, 50);
    
     fill(10,0,74); 
         ellipse(y, y, 20);
          noFill();
    ellipse(y, y, 30);
    ellipse(y, y, 40);    
    ellipse(y, y, 50);
    
         fill(10,0,74); 
         ellipse(-y, -y, 20);
          noFill();
    ellipse(-y, -y, 30);
    ellipse(-y, -y, 40);    
    ellipse(-y, -y, 50);
    
             fill(10,0,74); 
         ellipse(-y, y, 20);
          noFill();
    ellipse(-y, y, 30);
    ellipse(-y, y, 40);    
    ellipse(-y, y, 50);
    
    time += 0.01;

}
/*beginShape();
for (var i = 0; i \, this.history.lenght; i++) {
  var pos = this.history[i];
  vertex(pos.x, pos.y);
  
  endShape();
*/
