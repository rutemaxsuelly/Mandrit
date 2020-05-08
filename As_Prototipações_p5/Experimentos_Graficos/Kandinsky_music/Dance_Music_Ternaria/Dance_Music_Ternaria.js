let angle = 0;


function setup() {
    createCanvas(1340, 1080, WEBGL);
    center = createVector(width / 2, height / 2);

}

function draw() {
    pointLight(0, 0, 255, 0, -200, 0);
    background("#f2f279");

    ellipseMode(RADIUS);
    translate(-180, -10, -100);
    normalMaterial(100, 5, 80);
    sphere(50, 10, 50);
    box(10, 10, 10);
    drawsphere1();
    
    frameRate();

    //noLoop();

}

function drawsphere1() {
    stroke(10);
    fill(0, 0, 255);
    rotateX(angle / 2);
    fill(0, 20, 255);
    rotateY(angle / 2);
    stroke(50);
    line(0, 0, 150, 100);
    translate(180, 10, 100);
    normalMaterial(100, 50, 80);
    sphere(10, 50, 50);
    for (var a = 0; a < TWO_PI; a += 0.02) {
        //quant de petalas a partir de um raio
        //var x = r * cos(a);
        //point(x,y);
        var r = 300 * cos(6 * a);
        var x = r * cos(a);
        var y = r * sin(a);
        vertex(x, y);
        sphere(30, 50, vertex);
        line(100, 0, 300, 200);
        translate(-180, -10, -100);
        sphere(50, 10, 50);
        translate(100, 100, 160);
        sphere(10, 50, 50);
        translate(10, 60, 160);
        sphere(10, 10, 10);


        angle += 10000;


    }

}
