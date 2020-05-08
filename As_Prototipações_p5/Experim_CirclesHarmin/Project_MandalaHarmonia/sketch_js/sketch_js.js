let data;
let edges = [];

let radius = 50;
let nodeSize = 30;
let cc = new ChordConversion();

// preload table data
function preload() {
  data = loadTable(
    'assets/AdjacentMatrix.csv', 
    'csv');
  }
  
function setup() {
  createCanvas(windowWidth, windowHeight);
  // for (var i = 0; i < data.getRowCount(); i++) {
    //   let origem = "C";
    //   let transicao = data.getNum(i, origem);
    //   let destino = data.getString(i, 0);
    //   let cc = new ChordConversion();
    //   print(cc.getChordName(destino));
    // }
    // dictionary = {"C":1, "D":2};
    // print(dictionary["C"]);
    for (let r = 1; r < data.getRowCount(); r++) {
      for (let c = 1; c < data.getColumnCount(); c++) {
        let origem = data.getString(0, c);
        let destino = data.getString(r, 0); 
        let quantidade = int(data.getString(r, c));
        edges.push(new DataEdge(origem, destino, quantidade));
      }
    }
    noLoop();
}
    
function draw() {
  background(255);
  drawEllipses();
  drawEdges();
}
    
function drawEllipses() {
  ellipseMode(CENTER);
  push();
  translate(width / 2, height / 2);
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 6; j++) {
      let v = convertIndexIntoCoordinates(i, j, radius);
      ellipse(v.x, v.y, nodeSize, nodeSize);
      let chordName = cc.dictIndexToRootNote[i];
      let chordType = cc.dictIndexToChordType[j];
      let label = chordName + chordType;
      textAlign(CENTER, CENTER);
      text(label, v.x, v.y);
    }
  }
  pop();
}
    
function drawEdges(){
  push()
  translate(width / 2, height / 2);
  for(let i = 0; i < edges.length; i++){
    let edge = edges[i];
    let espessuraLinha = map(edge.tamanho, 0, 83, 0, 15);
    // let opacidadeLinha = constrain(1,100, map(edge.tamanho, 0, 83, 1, 100));
    let opacidadeLinha = map(edge.tamanho, 0, 83, 0, 127);
    if(edge.tamanho > 0){
      let index_origem_root = cc.getChordName(edge.origem).root;
      let index_origem_type = cc.getChordName(edge.origem).type;
      let index_destino_root = cc.getChordName(edge.destino).root;
      let index_destino_type = cc.getChordName(edge.destino).type;
      let ponto_inicial = convertIndexIntoCoordinates(index_origem_root, index_origem_type, radius);
      let ponto_final = convertIndexIntoCoordinates(index_destino_root, index_destino_type, radius);
      stroke(255,0,0,opacidadeLinha);
      strokeWeight(espessuraLinha);
      line(ponto_inicial.x, ponto_inicial.y+nodeSize/2, ponto_final.x, ponto_final.y-nodeSize/2);
    }
  }
  pop()
}
    
function convertIndexIntoCoordinates(i_, j_, radius_){
  let margin = 0;
  let spacing = radius_ + margin;
  let x = (radius_ + spacing * j_) * cos(i_*(TWO_PI / 12)-PI/2);
  let y = (radius_ + spacing * j_) * sin(i_*(TWO_PI / 12)-PI/2);
  return createVector(x,y);
}
