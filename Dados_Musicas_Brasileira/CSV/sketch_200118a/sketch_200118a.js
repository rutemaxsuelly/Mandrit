let airData;
let pm25;

function preload(){
  airData = loadTable("PRSA-adapted-aparrish.csv",
    "csv",
    "header");
}

function setup(){
  createCanvas(1340,640);
  console.log(airData.getRowCount());
  console.log(airData.getNum(49,"TEMP"));
  console.log(airData.getNum(49,"TEMP"));
  noLoop();
  noStroke();
  
    center = createVector(width/2, height/2);
  maxRadius = min(center.x, center.y) * 2;

  fill(250,250,220,220);
  noStroke();
  ellipseMode(CENTER);
  ellipse(center.x, center.y, 1000, 1000);

}

function draw(){
  background(220);
  pm25 = airData.getColumn("pm2.5");
  let pm25min = min(pm25);
  let pm25max = max(pm25);
  for(let i = 0; i< airData.getRowCount(); i++){
    let val = airData.getNum(i,"pm2.5");
    let ypos = map(val, pm25min, pm25max, height, 0);
    let xpos = map(i,0,airData.getRowCount(),0,width);
    fill(0);
    ellipse(xpos, ypos, 5, 5);
    let val2 = airData.getNum(i,"TEMP");
    let xpos2 = map(i,0,airData.getRowCount(),0,width);
    fill(0,200,100);
    ellipse(xpos2, height/2 - val2,5,5);
  }
}
