//MANDRIT - Análise musical por tracks pela ocorrência temporal cíclica e por rastros de quantidade de notas ;
///RADIAL COLUMN///TEMPO

let airData;
let raioFundo = 340;
let tempo;
let divisaoCirculo = 50;
let raioMenor = 100;
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
  airData = loadTable("csv_plot/File_tracksname/Takee_a_fiveee2.csv",
    "csv",
    "header");
    
    font = loadFont('assets/CaviarDreams.ttf');
}

function setup() {
  createCanvas(1780, 840);
  center = createVector(width/2, height/2);
  maxRadius = min(center.x, center.y) * 0.9;
  noLoop();
  stroke(255);
  background(255); 
  ellipseMode(CENTER);
  textFont(font);
        strokeWeight(1);
        stroke(0);
        textSize(50);
        text('M A N D R I T', 1200, 800, width);
 
 

/////LEGENDAS E REFERÊNCIAS GRAPHO////////
  //Referência COmpasso
  stroke(146);
        strokeWeight(10);
        point(200, 40, 100, 100);
        strokeWeight(1);
        line(200, 40, 100,100);
 
 //Sequência Temporal
        noStroke();
        textSize(15);
        //text('0', 182, 222, width);
        
 // Colunas organizadoras
        stroke(0);
        //Legenda Infos//
        line(450, 500, 450, 15); 
        line(1350, 500, 1350, 15); 
        
        //Legenda Track//
        line(450, 500, 450, 15);
        line(1350, 500,1770,500); 
        
        line(0, 500, 450, 500); 
        line(1, 500, 450, 500); 
        
        /*//verticais
        line(1770, 830, 0, 830); 
        line(1770, 15, 0, 15);
        //Horizontais
        line(1770, 15, 1770, 830); 
        line(2,15, 2, 830); 
        */
            
        strokeWeight(1);
        stroke(0);
        textSize(20);
        text('Referência do compasso', 200, 110, width);
        //text('Quantidade de Notas', 200, 350, width);
        text('Sequência Temporal', 200, 240, width);
       
      
  translate(width / 2, height / 2);
  textos();
  rotate(PI/-2);
  drawCirclefundo();
 
 ///RANGE DE CORES///
 //Faixa 01//
// amarelo = color(254,250,104);
// cores.push(amarelo);
  //Faixa 2//condução
vermelho = color(140,23,23);
cores.push(vermelho);
  //Faixa 3//Graves
 azul = color(0,0,255);
 cores.push(azul);
  //Faixa 4//agudos
 verde = color(0, 255, 90);
 cores.push(verde);
  //Faixa 5//floreios
laranja = color(255,133,0,400);
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
 violetaPastel = color(221,170,255);
 cores.push(violetaPastel);
 //Faixa 11//
 azulClaro = color(50,173,240);
 cores.push(azulClaro);
  //Faixa 12//
 pastelAlaranjado= color(233,108,102);
 cores.push(pastelAlaranjado);
  //Faixa 13//
 cinza= color(199, 200, 203);
 cores.push(cinza);
 //Faixa 14//
verdeEscuro= color(51, 163, 105);
 cores.push(verdeEscuro);
  //Faixa 15//
 laranjaPastel= color(246, 185, 78);
 cores.push(laranjaPastel);
  //Faixa 16//
 verdeClaro= color(200, 221, 90);
 cores.push(verdeClaro);

 
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
  
////PLOTANDO DADOS PLANILHA///
  indiceCor = 0;
  for(let i = 0; i< airData.getRowCount(); i++){
    let tempoAtual = airData.getNum(i,"Y");
    let faixaAtual = airData.getNum(i,"X");
    let quantidadeNotas = airData.getNum(i,"Total_de_notas");
    let faixa = criarOuAtualizarFaixa(faixaAtual, tempoAtual, quantidadeNotas);
    
    fill(faixa.cor);
    stroke(faixa.cor);
    drawCircles(faixa);
    drawRectLegenda(faixa); 
   
  }
    strokeWeight(1);
    faixas.sort(compare);
    //drawFaixas();
    
    //posicaoByQuantidadeTotalTempo(tempomax);
}
//Edges que conectam info Faixas em função de quantidade de notas e seus respectivos tempos

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
          faixas[a-1].cor.setAlpha(123);
          stroke(faixas[a-1].cor);
          //Desenha quantidade de notas
          strokeWeight(30);
          posicaoByQuantidadeNotas(faixaOrigem);
          posicaoByQuantidadeNotas(faixaDestino);
          line(faixaOrigem.x, faixaOrigem.y, faixaDestino.x, faixaDestino.y);
          
          //LEGENDA QUANTIDADE DE NOTAS EM RELAÇÃO A FAIXA///
          line(10, -800, 10, -700);
          //(x1,y1,x2,y2)
          line(-20, -750, 100, -750);
          fill(255);
          circle(20, -750, 20, -750);
         
         
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
        circleRadius = sin(angle/2) * raio * tamanho;
        xCircle = cos(angle*posicao) * raio;
        yCircle = sin(angle*posicao) * raio;
        faixa.x = xCircle;
        faixa.y = yCircle;
        //Desenha ocorrencia de tracks no tempo
        strokeWeight(8);
        line(xCircle, yCircle, circleRadius, circleRadius);
        //Legenda ocorrência de tempo por assinatura rítmica///
        line(150, -810, 200, -710);
        
        for (let i = 0; i < 16; i++) {
        let divTempName = TC.dictRootTemp[i];
        let label = divTempName;
        noStroke();   
     
        noFill();
        stroke(150);
        strokeWeight(0.01); //TIPO 1: 0.01
        //line(xCircle, yCircle, circleRadius, circleRadius);
        //rotate(100);  EXPERIMENTOS DIVERTIDOS 
        //point(xCircle, yCircle, circleRadius*2, circleRadius*2);
      
        }
}

//Maracação do compasso fixo ao fundo div = 16 tempos rítmicos
function drawCirclefundo(){
  
    //stroke(200);
    //fill(0);
    //circle(0,0,340);

    stroke(200);
    circle();
    noFill();
  
    circles = 96; //48 para outras músicas //TakeaFive 5/4 = 96 tempos
    angleFundo = Math.PI*2 / circles;
    //rotate(PI/-2); //para começar no ponteiro

    circleRaiofundo = sin(angleFundo/16) * raioFundo;
    
    for(var i = 0; i < circles; i++){
        xCircle = cos(angleFundo*i) * raioFundo;
        yCircle = sin(angleFundo*i) * raioFundo;
        ellipseMode(CENTER);
        
        stroke(235);
        fill(0);
        strokeWeight(8);
        point(xCircle, yCircle, circleRaiofundo+10, circleRaiofundo+5); //opção2: ellipse strokeWeight(5); noline; 
        strokeWeight(1);
        line(xCircle, yCircle, circleRaiofundo, circleRaiofundo);
       

    }
}
function drawRectLegenda(faixa){ 
noStroke();

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
         fill(marron);         
         circle(200, 560, 20, 60);
         rect(200, 560, 20, 60);
         /*fill(magenta);
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
        text(' Track 2 = Bateria', 620, -280, width);
        text(' Track 3 = Piano', 620,-260 , width);
        text(' Track 4 = Saxofone', 620, -240, width);
        text(' Track 5 = Baixo', 620, -220, width);
        text(' Track 6 = Piano', 620, -200, width);

        /*text(' Track 7 = Bateria', 620, -180, width);
        /*text(' Track 8 = Trompa natural (G)', 620,-160 , width);
        text(' Track 9 = Violino I', 620, -140, width);
        text(' Track 10 = Violino II ', 620, -120, width);
        text(' Track 11 = Viola I', 620,-100 , width);
        text(' Track 12 = Violoncelo', 620, -80, width);
        text(' Track 13 = Contrabaixo', 620, -60, width);
        //text(' Track 14 = ', 620, -40, width);
        //text(' Track 15 =  ', 620, -20, width);
        //text(' Track 16 ', 620, 0, width);     */
        
        
            
}
