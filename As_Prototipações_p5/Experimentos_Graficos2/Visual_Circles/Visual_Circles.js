let seeds = 2000;
 let zoom = 5;
 let angle = 50 * (Math.sqrt(5)-1) / 2;

function setup() {
createCanvas(1340, 1080);
push();
translate(width / 2, height / 2);
background(240, 240, 240);
noStroke();
}


function draw() {

//draw2();
//draw3();
draw1();
}

function draw1() {
 stroke(30);
 noFill();
 push();
translate(width / 2, height / 2);


      // rotate around the center while going outwards
      for(let i = 0; i < seeds; i++) {
        push();
        rotate(i * angle);
        
        let d = sqrt(i + 0.5) * zoom;
        stroke(0);
         ellipse(d, -10, 400, 400);
        stroke(255);
         ellipse(d, 90, 300, 300);
        stroke(0);
         ellipse(d, 190, 200, 200);
        stroke(255);
        //(x, y, raiox, raioy)
         ellipse(d, 300, 100, 100);
       }
}
//function draw3() {
   //push();
//translate(width / 2, height / 2);
  //fill(237, 34, 10);
  //beginShape();
  //vertex(-100, 100);
  //vertex(0, 350);
  //vertex(100, 100);
  //vertex(350, 0);
  //vertex(100, -80);
  //vertex(0, -350);
  //vertex(-100, -80);
  //vertex(-350, 0);
  //endShape();}
