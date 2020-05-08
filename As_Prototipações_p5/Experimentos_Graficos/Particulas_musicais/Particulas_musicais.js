let seeds = 2000;
let zoom = 5;
let radius = 15;
let angle = 1100 * (Math.sqrt(5)-1) / 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
    for (var i = 0; i < 50; i++) {
   var x= random(width);
   var y= random(height);
   var r= 10;
   fill(255,0,150,110);
      noStroke();
   ellipse(x,y, r*2, r*2);
 }

   let r1 = radius * zoom;
   translate(width/2, height/2);
    
   for(let i = 0; i < seeds; i++) {
    push();
    rotate(i * angle);
    // distance to the center of the sunflower
    let d = sqrt(i + 0.5) * zoom;
    fill(255,0,150,110);
     stroke(0,0,0);
    ellipse(d, 0, r1, r1);
    pop();
    }
    pop();
 }


function draw() {
  //drawBaiao();
}
