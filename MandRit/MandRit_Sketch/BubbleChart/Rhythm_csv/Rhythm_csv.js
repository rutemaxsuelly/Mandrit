//MANDRIT -  Quantidade de notas em função do tempo cíclico
//BUBBLE CHART//

let airData;
let raioFundo = 340;
let tempo;
let divisaoCirculo = 50; //40 //60
let raioMenor = 100;
let raioMaior = 300;
let tamanhoMenor = 0.5;//1//1//0.5
let tamanhoMaior = 3;//5//3//5
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

let button;
let sound;


function preload(){
  airData = loadTable("csv_musics/File_tracksname/RODA_VIVA_ChicoBuarqueTipo1Renomeado.csv",
    "csv",
    "header");
    
    sound = loadSound('ArquivoMusicas/RODA_VIVAChico.mp3');
    
  
    font = loadFont('assets/CaviarDreams.ttf');
}

function setup() {
  createCanvas(1780, 840);
  //Função Buttons - inclui botão de play em musica para facilitar análise e seu download da visualização. 
  buttons();
  center = createVector(width/2, height/2);
  maxRadius = min(center.x, center.y) * 0.9;
  noLoop();
  noStroke();
  //frameRate(30);
  background(255); 
  ellipseMode(CENTER);
  textFont(font);
   strokeWeight(1);
        stroke(0);
        textSize(50);
        text('M A N D R I T', 1200, 800, width);
            
        //Legenda Track//
        stroke(0);
        rect(10, 375, 420, 100);
        line(1350, 500, 1350, 15);
        line(1350, 500,1770,500); 

  translate(width / 2, height / 2);
   textos();
  drawCirclefundo();
   rotate(PI/-2);
   
  
        
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
 laranja = color(255,133,0,100);
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
violetaPastel = color(221,170,255);
 cores.push(violetaPastel);
 violetaPastel.setAlpha(128 + 128 * sin(millis() / 5000));
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
 //Faixa 14//
verdeEscuro= color(51, 163, 105);
 cores.push(verdeEscuro);
 verdeEscuro.setAlpha(128 + 128 * sin(millis() / 5000));
  //Faixa 15//
 laranjaPastel= color(246, 185, 78);
 cores.push(laranjaPastel);
 laranjaPastel.setAlpha(128 + 128 * sin(millis() / 5000));
  //Faixa 16//
 verdeClaro= color(200, 221, 90);
 cores.push(verdeClaro);
 verdeClaro.setAlpha(128 + 128 * sin(millis() / 5000)); 
 
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
  translate(width / 2, height / 2);
  rotate(PI/-2);
  noStroke();
  indiceCor = 0;
  for(let i = 0; i< airData.getRowCount(); i++){
    let tempoAtual = airData.getNum(i,"Y");
    let posicao = map(tempoAtual, tempomin, tempomax, 0, divisaoCirculo-1);
    let faixaAtual = airData.getNum(i,"X");
    let faixaAtualLegenda = airData.getNum(i,"X");
    let indice = criarOuAtualizarFaixa(faixaAtual);
    let faixa = faixas[indice];
    let raio = map(faixaAtual, faixamin, faixamax, raioMaior, raioMenor);
    let tamanhoAtual = airData.getNum(i,"Total_de_notas");
    let tamanho = map(tamanhoAtual, tamanhomax, tamanhomin, tamanhoMaior, tamanhoMenor);
    
    fill(faixa.cor);
    
    drawCircles(divisaoCirculo,raio, posicao, tamanho);
        
        //drawLegenda(faixa);
        
         drawRectLegenda(faixa);

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
////////CIRCLES SEQUÊNCIA ÂNGULAR (EM FUNÇÃO DO TEMPO)/////////
function drawCircle(angle, i, radius,circleRadius){
  xCircle = cos(angle*i) * radius;
        yCircle = sin(angle*i) * radius;

        ellipse(xCircle, yCircle, circleRadius*2, circleRadius*2);
}

////////CIRCLES EM FUNÇÃO DA QUANTIDADE/////////
function drawCircles(circles, radius, i, tamanho){
    angle = Math.PI*2 / circles;
    circleRadius = sin(angle/2) * radius *tamanho;
    ellipseMode(CENTER);
    
    //Reitera o draw também em função do tempo//
    drawCircle(angle, i, radius,circleRadius);
}

 //Maracação do compasso fixo ao fundo div = 16 tempos rítmicos
function drawCirclefundo(){
  
  //Opção Nogrid:
        //stroke(0);
    //fill(0);
    //circle(0,0,340);
  
  
    ellipseMode(CENTER);
    stroke(146);
    noFill();
    //strokeWeight();
  
    circles = 48;
    angleFundo = Math.PI*2 / circles;
    //rotate(2*PI); //para começar no ponteiro

    circleRaiofundo = sin(angleFundo/16) * raioFundo;
    
    for(var i = 0; i < circles; i++){
        xCircle = cos(angleFundo*i) * raioFundo;
        yCircle = sin(angleFundo*i) * raioFundo;
        ellipseMode(CENTER);
        strokeWeight(5);
        point(xCircle, yCircle, circleRaiofundo, circleRaiofundo); //+5, +10
        strokeWeight(1);
        line(xCircle,yCircle , circleRaiofundo, circleRaiofundo)+10;       
        
    }
} 
       
//TENTATIVA DE CRIAR LEGENDA AUTOMÁTICA//
function drawLegenda(faixa){ 
noStroke();

  for(i = 0; i< faixas.length;i++){
    if(faixas[i] && faixas[i].cor == faixaAtualLegenda){
      faixas[i].cor++;
      console.log(faixas[i]);
      console.log(i);
      return i;
    }
    indiceCor++;
  if(indiceCor >= cores.length){
    indiceCor = 0;
    }
  }
  faixas.push(new Faixa(faixaAtualLegenda, cores[indiceCor]));
  return faixas.length-1;
  
  drawRectLegenda(faixaLegenda);
}
  
 
  function drawRectLegenda(faixaLegenda){
  
         //fill(faixa.cor)
         //fill( amarelo);
         //circle(300, 560, 20, 60);
         //rect(300, 560, 20, 60);
         fill(vermelho);         
         circle(280, 560, 20, 60);
         rect(280, 560, 20, 60);
         fill(azul);
         circle(260, 560, 20, 60);
         rect(260, 560, 20, 60);
         fill(verde);
         circle(240, 560, 20, 60);
         rect(240, 560, 20, 60);
           
         fill(laranja);
         circle(220, 560, 20, 60);
         rect(220, 560, 20, 60);
         /*fill(marron);         
         circle(200, 560, 20, 60);
         rect(200, 560, 20, 60);
         fill(magenta);
         circle(180, 560, 20, 60);
         rect(180, 560, 20, 60);
         fill(roxo);
         circle(160, 560, 20, 60);
         rect(160, 560, 20, 60);
       
         
         fill(rosa);         
         circle(140, 560, 20, 60);
         rect(140, 560, 20, 60);
         
         fill(violetaPastel);
         circle(120, 560, 20, 60);
         rect(120, 560, 20, 60);
         fill(azulClaro);
         circle(100, 560, 20, 60);
         rect(100, 560, 20, 60);
         fill(pastelAlaranjado);
         circle(80, 560, 20,60);
         rect(80, 560, 20,60);
       
         fill(cinza);
         circle(60, 560, 20, 60);
         rect(60, 560, 20, 60);
         fill(verdeEscuro);
         circle(40, 560, 20, 60);
         rect(40, 560, 20, 60);
         fill(laranjaPastel);
         circle(20, 560, 20, 60);
         rect(20, 560, 20, 60);
         fill(verdeClaro);
         circle(0, 560, 20, 60);
         rect(-20, 560, 40, 60); 
         */
  }

function textos(){
    textSize(20);
        stroke(0);
        text('1',-10, -350, width);
        text('+',125, -325, width);
        text('2',250, -240, width);
        text('+',325, -130, width);
        text('3',350, 5, width);
        text('+',320, 140, width);
        text('4',250, 250, width);
        text('+',120, 335, width);
        text('1',-5, 365, width);
        text('+',-150, 330, width);
        text('2',-260, 265, width);
        text('+',-340, 140, width);
        text('3',-370, 0, width);        
        text('+',-340, -130, width);
        text('4',-260, -240, width);
        text('+',-145, -320, width); 
        
        //OPÇÃO DE MARCAÇÃO DE REFERÊNCIA DE SUBDIVISÕES DO COMPASSO//
                /*text('16 = 0',-20, -350, width);
        text('2',250, -240, width);
        text('1',125, -325, width);
        text('3',325, -130, width);
        text('4',350, 5, width);
        text('5',320, 140, width);
        text('6',250, 250, width);
        text('7',120, 335, width);
        text('8',-5, 365, width);
        text('9',-150, 330, width);
        text('10',-260, 265, width);
        text('11',-350, 130, width);
        text('12',-370, 0, width);        
        text('13',-340, -130, width);
        text('14',-270, -240, width);
        text('15',-160, -320, width); */ 
        
        strokeWeight(1);
        stroke(0);
        textSize(18);
       //text(' Track 1 = Piano  ', 620, -300, width);
        text(' Track 2 = Soprano ', 620, -280, width);
        text(' Track 3 = Alto ', 620,-260 , width);
        text(' Track 4 = Tenor ', 620, -240, width);
        text(' Track 5 = Baixo', 620, -220, width);
        /*text(' Track 6 =  Saxofone (Alto)', 620, -200, width);
     
        text(' Track 7 = Saxofone (Tenor)', 620, -180, width);
        
        text(' Track 8 = Trombone ', 620,-160 , width);
        text(' Track 9 = Baixo ', 620, -140, width);
        text(' Track 10 = Tuba ', 620, -120, width);
        text(' Track 11  ', 620,-100 , width);
        text(' Track 12 ', 620, -80, width);
        text(' Track 13 ', 620, -60, width);
        text(' Track 14 ', 620, -40, width);
        text(' Track 15 ', 620, -20, width);
        text(' Track 16 ', 620, 0, width);
        */
        
        
}

function mouseClicked() {
  if (sound.isPlaying()) {
    // .isPlaying() returns a boolean
    sound.stop();
    //background(255, 0, 0);
  } else {
    sound.play();
    //background(0, 255, 0); 
  }
}

function mouseClickedSave(){
  save('analisemusical.jpg');  
}

function buttons (){
  
 ///INCLUIR SOM PARA FACILITAR ANÁLISE///
  background(0);
    sound.loop();
  createP('');
  button = createButton('PLAY / STOP MUSIC');
  button.size(180,50);
  button.position(20, 400);
  button.mousePressed(mouseClicked);
  button.style("font-family","CaviarDreams");
  button.style("background-color","#E3E3E3");
  button.style("font-size", "16px");
  
     
  createP('');
  button = createButton('SAVE VISUAL MUSIC');
  button.size(180, 50);
  button.position(230, 400);
  button.mousePressed(mouseClickedSave);
  button.style("font-family","CaviarDreams");
  button.style("background-color","#E3E3E3");
  button.style("font-size", "16px");
  
}
