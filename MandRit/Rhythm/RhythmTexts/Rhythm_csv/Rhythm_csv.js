let airData;
let raioFundo = 300;
let tempo;
let divisaoCirculo = 60;
let raioMenor = 50;
let raioMaior = 300;
let tamanhoMenor = .1;
let tamanhoMaior = .1;
let apenasEssasFaixas = [];//se for nulo ou vazio mostra todos asFaixas ou apenas os que estiverm no array: Exemplo [2,3];
let cores = [];
let faixas = [];
let edges = [];
let tempomin;
let tempomax;
let faixamin;
let faixamax;
let tamanho;
let tamanhomin;
let tamanhomax;
let indiceCor = 0;
let TC = new TempConversion();

function preload(){
  airData = loadTable("csv_plot/takeafive.csv",
    "csv",
    "header");
}

function setup() {
  createCanvas(1500, 750);
  center = createVector(width/2, height/2);
  maxRadius = min(center.x, center.y) * 0.9;
  noLoop();
  stroke(255,255,255);
  
  //background(50, 71, 89); 
  background(255); 
  ellipseMode(CENTER);

  translate(width / 2, height / 2);
  //rotate(PI/-2);
 
 ///RANGE DE CORES///
 //Faixa 1//
 amarelo = color(254,250,104);
 cores.push(amarelo);
  //Faixa 2//
 vermelho = color(140,23,23);
 cores.push(vermelho);
  //Faixa 3//
 azul = color(0,0,255);
 cores.push(azul);
  //Faixa 4//
 verde = color(0, 255, 90);
 cores.push(verde);
  //Faixa 5//
 laranja = color(242,107,67);
 cores.push(laranja);
  //Faixa 6//
 marron = color(184,115,51);
 cores.push(marron);
  //Faixa 7//
 magenta = color(239,98,166);
 cores.push(magenta);
  //Faixa 8//
 roxo = color(117,92,160);
 cores.push(roxo);
  //Faixa 9//
 rosa = color(255,192,203);
 cores.push(rosa);
  //Faixa 10//
 esverdeado = color(55,166,148);
 cores.push(esverdeado);
  //Faixa 11//
 azulClaro = color(50,173,240);
 cores.push(azulClaro);
  //Faixa 12//
 pastelAlaranjado= color(233,108,102);
 cores.push(pastelAlaranjado);
  //Faixa 13//
 cinza= color(199, 200, 203);
 cores.push(cinza);
 
 ///// INFO DO CSV /////
 tempo = airData.getColumn("Y");
 tempomin = min(tempo);
 tempomax = max(tempo);
 faixa = airData.getColumn("X");
 faixamin = min(faixa);
 faixamax = max(faixa);
 tamanho = airData.getColumn("Total_de_notas");
 tamanhomin = min(tamanho);
 tamanhomax = max(tamanho);

  
  drawCirclefundo();
  //drawLines();
  indiceCor = 0;
  for(let i = 0; i< airData.getRowCount(); i++){
    let tempoAtual = airData.getNum(i,"Y");
    let faixaAtual = airData.getNum(i,"X");
    let quantidadeNotas = airData.getNum(i,"Total_de_notas");
    let faixa = criarOuAtualizarFaixa(faixaAtual, tempoAtual, quantidadeNotas);
    
    fill(faixa.cor);
    stroke(faixa.cor);
    drawCircles(faixa);
    
    
  }
    strokeWeight(10);
    faixas.sort(compare);
    drawFaixas();
    drawRectLegenda(faixa.cor);
    
    //posicaoByQuantidadeTotalTempo(tempomax);
}
//Edges que conectam info de quantidade de notas relação ao tempo e suas respectivas faixas
function drawFaixas(){
  let faixaInicio = null;
    let faixaOrigem = null;
    let faixaDestino = null;
    for(let a = 1; a<= faixas.length; a++){
      faixaOrigem = faixas[a-1];
      faixaDestino = faixas[a];
      if(!apenasEssasFaixas || apenasEssasFaixas && apenasEssasFaixas.length ==0 || apenasEssasFaixas && apenasEssasFaixas.includes(faixaOrigem.numero)){
        if(faixaOrigem){
          if(!faixaDestino){
            faixaDestino = faixaInicio;
          }
          if(!faixaInicio){
            faixaInicio = faixaOrigem;
          }
          if(faixaInicio.numero != faixaDestino.numero) {
            let aux = faixaInicio;
            faixaInicio = faixaDestino;
            faixaDestino = aux;
          }
          //opacidade
          faixas[a-1].cor.setAlpha(123);
          stroke(faixas[a-1].cor);
          strokeWeight(30);
          posicaoByQuantidadeNotas(faixaOrigem);
          posicaoByQuantidadeNotas(faixaDestino);
          line(faixaOrigem.x, faixaOrigem.y, faixaDestino.x, faixaDestino.y);
        }
      }
    }
}

function posicaoByQuantidadeNotas(faixa){
  let posicao = map(faixa.tempo, tempomin, tempomax, 0, divisaoCirculo-1);
  let tamanho = map(faixa.quantidadeNotas, tamanhomin, tamanhomax, tamanhoMaior, tamanhoMenor);
  let raioTamanho = map(faixa.quantidadeNotas, tamanhomin, tamanhomax, raioMenor, raioMaior);
  angle = Math.PI*2 / divisaoCirculo;
  circleRadius = sin(angle/2) * raioTamanho *tamanho;
  xCircle = cos(angle*posicao) * raioTamanho;
  yCircle = sin(angle*posicao) * raioTamanho;
  faixa.x = xCircle;
  faixa.y = yCircle;
}
//Tentativa de plotar os compassos
/*function posicaoByQuantidadeTotalTempo (tempomax){
  let posicaoTempo = map(faixa.tempo, tempomin, tempomax, 0, divisaoCirculo-1);
  let tamanhoTempo = map(faixa.quantidadeTempo, tempomin, tempomax, tamanhoMaior, tamanhoMenor);
  let raioTamanho = map(faixa.quantidadeTempo, tempomin, tempomax, raioMenor, raioMaior);
  angle = Math.PI*2 / divisaoCirculo;
  circleRadius = sin(angle/2) * raioTamanho * tamanhoTempo;
  xCircle = cos(angle*posicaoTempo) * raioTamanho;
  yCircle = sin(angle*posicaoTempo) * raioTamanho;
  faixa.x = xCircle;
  faixa.y = yCircle;
}*/


function compare(faixa0, faixa1) {
  if (faixa0.numero >= faixa1.numero && faixa0.tempo > faixa1.tempo) {
    return 1;
  }
  if (faixa1.numero >= faixa0.numero && faixa1.tempo > faixa0.tempo) { 
    return -1;
  }
  return 0;
}


function draw() {      
}

function criarOuAtualizarFaixa(faixaAtual, tempo, quantidadeNotas){
  let corFaixa = null;
  for(i = 0; i< faixas.length;i++){
    if(faixas[i] && faixas[i].numero == faixaAtual){
      corFaixa = faixas[i].cor;
    }
  }
  let novaFaixa = new Faixa( faixaAtual, tempo, quantidadeNotas, cores[indiceCor]);
  if(corFaixa){
    novaFaixa.cor = corFaixa;
  } else {
    novaFaixa.cor = cores[indiceCor];
    indiceCor++;    
    if(indiceCor >= cores.length){
      indiceCor = 0;
    }
  }
  faixas.push(novaFaixa);
  return novaFaixa;
}
////////CIRCLES do tempo/////////
 //Pegam informações do csv
 
function drawCirclesExterno(tempo){
    let raio = map(tempo.numero, tempomin, tempomax, raioMaior, raioMenor);
    let posicao = map(faixa.tempo, tempomin, tempomax, 0, divisaoCirculo-1);
    let tamanho = map(faixa.quantidadeNotas, tamanhomin, tamanhomax, tamanhoMaior, tamanhoMenor);
    let raioTamanho = map(faixa.quantidadeNotas, tamanhomin, tamanhomax, raioMenor, raioMaior);
    
    ellipseMode(CENTER);
    drawCircleExterno(raio,posicao, tamanho, tempo);
}
 //Coleta de informações do csv para plotar em drawCircle
function drawCircles(faixa){
    let raio = map(faixa.numero, faixamin, faixamax, raioMaior, raioMenor);
    let posicao = map(faixa.tempo, tempomin, tempomax, 0, divisaoCirculo-1);
    let tamanho = map(faixa.quantidadeNotas, tamanhomin, tamanhomax, tamanhoMaior, tamanhoMenor);
    let raioTamanho = map(faixa.quantidadeNotas, tamanhomin, tamanhomax, raioMenor, raioMaior);
    
    ellipseMode(CENTER);
    drawCircle(raio,posicao, tamanho, faixa);
    
}
 //Descritor dos Paramêtros e informações dos Circulos
function drawCircle(raio,posicao, tamanho, faixa){
        angle = Math.PI*2 / divisaoCirculo;
        circleRadius = sin(angle/2) * raio *tamanho;
        xCircle = cos(angle*posicao) * raio;
        yCircle = sin(angle*posicao) * raio;
        faixa.x = xCircle;
        faixa.y = yCircle;
        strokeWeight(10);
        //quad(xCircle, yCircle, circleRadius*2, circleRadius*2); 
        
        for (let i = 0; i < 16; i++) {
        let divTempName = TC.dictRootTemp[i];
        let label = divTempName;
        noStroke();
        strokeWeight(10);
        text(label, xCircle, yCircle);
     
        noFill();
        stroke(165);
        strokeWeight(0.01);
        line(xCircle, yCircle, circleRadius*2, circleRadius*2);
        //point(xCircle, yCircle, circleRadius*2, circleRadius*2);
        }
}

//Maracação do compasso fixo ao fundo div = 16 tempos rítmicos
function drawCirclefundo(){
    
    stroke(33);
    noFill();
    //strokeWeight();
  
    circles = 16;
    angleFundo = Math.PI*2 / circles;
    rotate(PI/-2); //para começar no ponteiro

    circleRaiofundo = sin(angleFundo/16) * raioFundo;
   
    for(var i = 0; i < circles; i++){
        xCircle = cos(angleFundo*i) * raioFundo;
        yCircle = sin(angleFundo*i) * raioFundo;
        ellipseMode(CENTER);
        strokeWeight(20);
        point(xCircle, yCircle, circleRaiofundo*2, circleRaiofundo*2);
        strokeWeight(2);
        line(xCircle, yCircle, circleRaiofundo*2, circleRaiofundo*2);  
    }
}
function drawRectLegenda(faixa){ 
 strokeWeight(1);
 rotate(PI/2);
         fill(azul);
         rect(550, -200, 60, 20);
         fill(vermelho);
         rect(550, -100, 60, 20);
         fill(amarelo);
         rect(550, 0, 60, 20);
         
        stroke(0);
        textSize(20);
        text('Track 1', 480, -200, width);
        text('Track 2', 480, -100, width);
        text('Track 3', 480, 0, width);
        //text('Track 4', 480, 100, width);
        //text('Track 5', 480, 200, width);
        //text('Track 4', 480, 100, width);
        //text('Track 5', 480, 200, width);
        //text('Track 4', 480, 100, width);
        //text('Track 5', 480, 200, width);
        //text('Track 4', 480, 100, width);
        //text('Track 5', 480, 200, width);
        //text('Track 4', 480, 100, width);
        //text('Track 5', 480, 200, width);
        //text('Track 4', 480, 100, width);
        //text('Track 5', 480, 200, width);
           
         //Divisao compasso
        stroke(0);
        text('16 = 0',-20, -330, width);
        text('2',250, -240, width);
        text('1',120, -300, width);
        text('3',320, -120, width);
        text('4',340, 0, width);
        text('5',320, 120, width);
        text('6',230, 250, width);
        text('7',120, 320, width);
        text('8',0, 350, width);
        text('9',-120, 320, width);
        text('10',-250, 240, width);
        text('11',-320, 140, width);
        text('12',-350, 0, width);        
        text('13',-320, -120, width);
        text('14',-250, -220, width);
        text('15',-150, -300, width);         

}



///////LINHAS_RAIOS/////////

function drawLines(){
  ellipseMode(CENTER);
  stroke(255);
  strokeWeight(5);
  points       = 16;           //number of points 
  angleFundo = Math.PI*2  / points; //angle between points
       //length of each line from centre to edge of circle
  for (var i = 0; i < points; i++){
    x = cos(radians(angleFundo)) * raioFundo; //convert angle to radians for x and y coordinates
    y = sin(radians(angleFundo)) * raioFundo;
    line(raioFundo, raioFundo, x+raioFundo, y+raioFundo); //draw a line from each point back to the centre
   
  }
}

/*
 /// CLASSE/////
  class tempo{
    constructor(numero, quantidade){
        this.numero = numero;
        this.quantidade = quantidade;
    }
}
  ///GET DATA - DRAW////
    let tempoAtual = airData.getNum(i,"Y");
    let indice1 = criarOuAtualizarTempo(tempoAtual);
    let tempo = tempos[indice1];
    let posicao = map(tempoAtual, tempomin, tempomax, 0, divisaoCirculo-1);
    
    
function criarOuAtualizarTempo(tempoAtual){
  for(i = 0; i< tempos.length;i++){
    if(tempos[i] && tempos[i].numero == tempoAtual){
      tempos[i].quantidade++;
      console.log(tempo[i]);
      console.log(i);
      return i;
    }
  indiceQuantidade++;
  if(indiceQuantidade >= quantidades.length){
    indiceQuantidade = 0;
  }
  tempos.push(new tempo(tempoAtual, quantidade));
  return tempos.length-1;
   }
}



function draw() {
tempo = airData.getColumn("Y");
  let tempomin = min(tempo);
  let tempomax = max(tempo);
  faixa = airData.getColumn("X");
  let faixamin = min(faixa);
  let faixamax = max(faixa);
  ellipseMode(CENTER);
  stroke(255,50,0);
  //translate(width / 2, height / 2);
  for(let i = 0; i< airData.getRowCount(); i++){
    let tempoLinha = airData.getNum(i,"Y");
    let angulo = map(tempoLinha, tempomin, tempomax, 0, 359);
    let faixaAtual = airData.getNum(i,"X");
    let raio = map(faixaAtual, faixamin, faixamax, 0, 10);
    fill(0);
    let tamanho = airData.getNum(i,"Total_de_tempo");
    //let v = convertIndexIntoCoordinates(tempoLinha, angulo, radius);
    ellipse(angulo, raio, tamanho, tamanho);
   
    */
