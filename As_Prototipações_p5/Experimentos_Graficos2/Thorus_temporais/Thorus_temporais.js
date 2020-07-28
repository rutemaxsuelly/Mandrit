let raioFundo = 200; //Opcao 1=100

function setup() {
createCanvas(1780, 1500);
  center = createVector(width/2, height/2);
  maxRadius = min(center.x, center.y) * 0.9;
  noLoop();
  stroke(255);
  background(0); 
  ellipseMode(CENTER);
  translate(width / 2, height / 2);
  rotate(PI/-2);
  drawCirclefundo();
}


function draw() {
}

function drawCirclefundo(){
 

    stroke(140);
    circle();
    noFill();
  
    circles = 800; ////Opção 2 = 800 //Opcao 1 = 200
    angleFundo = Math.PI*2 / circles;
    //rotate(PI/-2); //para começar no ponteiro

    circleRaiofundo = sin(angleFundo/16) * raioFundo;
    
    for(var i = 0; i < circles; i++){
        xCircle = random(cos(angleFundo*i) * raioFundo); //excluir random gera grafico2
        yCircle = random(sin(angleFundo*i) * raioFundo);
        ellipseMode(CENTER);
        
        stroke(255);
        fill(0);
        strokeWeight(1);
        point(xCircle+300, yCircle+300, circleRaiofundo+10, circleRaiofundo+5); //opção2: point e strokeWeight(5);
        strokeWeight(0.2);
        line(xCircle+300, yCircle+300, circleRaiofundo, circleRaiofundo);
        
        point(xCircle, yCircle, circleRaiofundo+10, circleRaiofundo+5); //opção2: point e strokeWeight(5);
        strokeWeight(0.2);
        line(xCircle, yCircle, circleRaiofundo, circleRaiofundo);

        strokeWeight(1);
        point(xCircle-300, yCircle-300, circleRaiofundo+20, circleRaiofundo+10); //opção2: point e strokeWeight(5);
        strokeWeight(0.2);
        line(xCircle-300, yCircle-300, circleRaiofundo, circleRaiofundo);
        
        strokeWeight(3);
        point(xCircle+500, yCircle+500, circleRaiofundo+10, circleRaiofundo+5); //opção2: point e strokeWeight(5);
        strokeWeight(0.2);
        line(xCircle+500, yCircle+500, circleRaiofundo, circleRaiofundo);
       

        strokeWeight(3);
        point(xCircle-500, yCircle-500, circleRaiofundo+20, circleRaiofundo+10); //opção2: point e strokeWeight(5);
        strokeWeight(0.2);
        line(xCircle-500, yCircle-500, circleRaiofundo, circleRaiofundo);
        
        
        
        circle(xCircle+10,  yCircle+10, 10,10);
        circle(xCircle+50,  yCircle+20, 10,10);

        circle(xCircle+200,  yCircle+40, 50,50);
        circle(xCircle+250,  yCircle+50, 50,50);
        
        circle(xCircle-200,  yCircle+40, 50, 50); //Opcao 2 = 100
        circle(xCircle-250,  yCircle+50, 50,50);
        
        circle(xCircle+400,  yCircle+30, 100,200);
        circle(xCircle+450, yCircle+60, 100,200);
        
        circle(xCircle-400,  yCircle+30, 100,200);
        circle(xCircle-450, yCircle+60, 100,200);
        


       

    }
}
