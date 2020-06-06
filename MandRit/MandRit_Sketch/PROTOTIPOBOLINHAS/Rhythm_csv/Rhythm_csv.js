//MANDRIT -  Quantidade de notas em função do tempo cíclico

let airData;
let raioFundo = 300;
let tempo;
let divisaoCirculo = 60;
let raioMenor = 50;
let raioMaior = 300;
let tamanhoMenor = 0.5;//1//1//0.5
let tamanhoMaior = 2;//5//3//5
let cores = [];
let faixas = [];
let tempomin;
let tempomax;
let faixamin;
let faixamax;
let tamanho;
let tamanhomin;
let tamanhomax;
let indiceCor = 0;

function preload(){
  airData = loadTable("csv_musics/aquareladobrasil.csv",
    "csv",
    "header");
}

function setup() {
  createCanvas(1350, 800);
  center = createVector(width/2, height/2);
  maxRadius = min(center.x, center.y) * 0.9;
  noLoop();
  noStroke();
  //frameRate(30);

  ///RANGE DE CORES///
 //Faixa 1//Condução
 amarelo = color(254,250,104);
 cores.push(amarelo);
 amarelo.setAlpha(128 + 128 * sin(millis() / 5000));
  //Faixa 2//condução
 vermelho = color(140,23,23);
 cores.push(vermelho);
 vermelho.setAlpha(128 + 128 * sin(millis() / 5000));
  //Faixa 3//Graves
 azul = color(0,0,255);
 cores.push(azul);
 azul.setAlpha(128 + 128 * sin(millis() / 5000));
  //Faixa 4//agudos
 verde = color(0, 255, 90);
 cores.push(verde);
 verde.setAlpha(128 + 128 * sin(millis() / 5000));
  //Faixa 5//floreios
 laranja = color(242,107,67,100);
 cores.push(laranja);
 laranja.setAlpha(128 + 128 * sin(millis() / 5000));
  //Faixa 6//
 marron = color(184,115,51);
 cores.push(marron);
 marron.setAlpha(128 + 128 * sin(millis() / 5000));
  //Faixa 7//
 magenta = color(239,98,166);
 cores.push(magenta);
 magenta.setAlpha(128 + 128 * sin(millis() / 5000));
  //Faixa 8//
 roxo = color(117,92,160);
 cores.push(roxo);
 roxo.setAlpha(128 + 128 * sin(millis() / 5000));
  //Faixa 9//
 rosa = color(255,192,203);
 cores.push(rosa);
 rosa.setAlpha(128 + 128 * sin(millis() / 5000));
  //Faixa 10//
 esverdeado = color(55,166,148);
 cores.push(esverdeado);
 esverdeado.setAlpha(128 + 128 * sin(millis() / 5000));
  //Faixa 11//
 azulClaro = color(50,173,240);
 cores.push(azulClaro);
 azulClaro.setAlpha(128 + 128 * sin(millis() / 5000));
  //Faixa 12//
 pastelAlaranjado= color(233,108,102);
 cores.push(pastelAlaranjado);
 pastelAlaranjado.setAlpha(128 + 128 * sin(millis() / 5000));
  //Faixa 13//
 cinza= color(199, 200, 203);
 cores.push(cinza);
 cinza.setAlpha(128 + 128 * sin(millis() / 5000));
 
 //drawCirclefundo();
 
 tempo = airData.getColumn("Y");
 tempomin = min(tempo);
 tempomax = max(tempo);
 faixa = airData.getColumn("X");
 faixamin = min(faixa);
 faixamax = max(faixa);
 tamanho = airData.getColumn("Total_de_notas");
 tamanhomin = min(tamanho);
 tamanhomax = max(tamanho);
 
 
}

function draw() {
  background(255); 
  ellipseMode(CENTER);
  //stroke(255,50,0);
  translate(width / 2, height / 2);
  rotate(PI/-2);
  indiceCor = 0;
  for(let i = 0; i< airData.getRowCount(); i++){
    let tempoAtual = airData.getNum(i,"Y");
    let posicao = map(tempoAtual, tempomin, tempomax, 0, divisaoCirculo-1);
    let faixaAtual = airData.getNum(i,"X");
    let indice = criarOuAtualizarFaixa(faixaAtual);
    let faixa = faixas[indice];
    let raio = map(faixaAtual, faixamin, faixamax, raioMaior, raioMenor);
    let tamanhoAtual = airData.getNum(i,"Total_de_notas");
    let tamanho = map(tamanhoAtual, tamanhomin, tamanhomax, tamanhoMaior, tamanhoMenor);
    
    fill(faixa.cor);
    
    drawCircles(divisaoCirculo,raio, posicao, tamanho);
    //drawEdges(divisaoCirculo, raio, points);
  }
}

function criarOuAtualizarFaixa(faixaAtual){
  for(i = 0; i< faixas.length;i++){
    if(faixas[i] && faixas[i].numero == faixaAtual){
      faixas[i].quantidade++;
      console.log(faixas[i]);
      console.log(i);
      return i;
    }
  }
  indiceCor++;
  if(indiceCor >= cores.length){
    indiceCor = 0;
  }
  faixas.push(new Faixa(faixaAtual, cores[indiceCor]));
  return faixas.length-1;
  
  
}
  
 //Maracação do compasso fixo ao fundo div = 16 tempos rítmicos
function drawCirclefundo(){
    
    stroke(33);
    noFill();
    //strokeWeight();
  
    circles = 16;
    angleFundo = Math.PI*2 / circles;
    //rotate(PI/-2); //para começar no ponteiro

    circleRaiofundo = sin(angleFundo/16) * raioFundo;
    
    for(var i = 0; i < circles; i++){
        xCircle = cos(angleFundo*i) * raioFundo;
        yCircle = sin(angleFundo*i) * raioFundo;
        ellipseMode(CENTER);
        strokeWeight(20);
        point(xCircle, yCircle, circleRaiofundo, circleRaiofundo);
        strokeWeight(2);
        line(xCircle, yCircle, circleRaiofundo, circleRaiofundo);

    }
}


////////CIRCLES/////////


function drawCircles(circles, radius, i, tamanho){
    angle = Math.PI*2 / circles;
    circleRadius = sin(angle/2) * radius *tamanho;
    ellipseMode(CENTER);
    drawCircle(angle, i, radius,circleRadius);
}

function drawCircle(angle, i, radius,circleRadius){
  xCircle = cos(angle*i) * radius;
        yCircle = sin(angle*i) * radius;
         
        ellipse(xCircle, yCircle, circleRadius*2, circleRadius*2);
}
