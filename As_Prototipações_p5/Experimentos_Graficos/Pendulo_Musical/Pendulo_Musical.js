let angle = 0;

function setup() {
  createCanvas(1340, 1080, WEBGL);
}

function draw() {
  background(175);
  
  ellipseMode(CENTER);
  noStroke();
  fill(0,0,255);
  rotateX(angle/2);
  fill(0,20,255);
  rotateY(angle/2);
  stroke(5);
  line(0,0,150,100);
  translate(180,10, 100);
  sphere(10,50,50);
  translate(-180,-10, -100);
  sphere(50,10,50);
   line(0,0,300,200);
   sphere(50,50,50);
  for(var a = 0; a < TWO_PI; a += 0.02) {
    //quant de petalas a partir de um raio
    //var x = r * cos(a);
    //point(x,y);
    var r = 300 * cos(3 * a);
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x,y);
    sphere(30,50,vertex);
 //translate(100,100, 160);
  //sphere(10,50,50);
  
  //translate(300,100, 160);
  
  
   angle += 10000;
  
  
  }
  
  //box(10, 100, 50);
  
 

}
