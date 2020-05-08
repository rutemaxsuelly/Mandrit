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
    let radius = 50
    stroke(255);
    fill(255);
    
    
    stroke(255); 
    noFill();
    ellipse(100, 100, radius * 2);

    let x = radius * cos(time);
    let y = radius * sin(time);
    
    var x1= random(width);
   var y1= random(height);
   var r= 48;
   
    ellipse(x, y, 20);
    ellipse(x, y, 30);
    ellipse(x, y, 40);
    ellipse(x, y, 50);

        ellipse(x, x, 20);
        ellipse(x, x, 30);
        ellipse(x, x, 40);
        ellipse(x, x, 50);
        
     ellipse(y, x, 20);
    ellipse(y, x, 30);
    ellipse(y, x, 40);    
    ellipse(y, x, 50);
    
    time += 0.01;

}
/*beginShape();
for (var i = 0; i \, this.history.lenght; i++) {
  var pos = this.history[i];
  vertex(pos.x, pos.y);
  
  endShape();
*/
