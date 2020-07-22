let dim;

function preload(){
    
    font = loadFont('Assets/CaviarDreams.ttf');
}

function setup() {
  createCanvas(1780, 840);
  dim = width / 2;
  background(0);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  ellipseMode(RADIUS);
  frameRate(1);
  
    textFont(font);
        strokeWeight(1);
        noStroke();
        fill(255);
        textSize(100);
        text('M A N D R I T', 1000, 420, width);
        noStroke();
        fill(255);
        textSize(20);
        let s = 'O Mandrit é uma aplicação web para visualização e análise musical. Projeto desenvolvido, no período de 2019-2020 em estudo da pesquisa de mestrado por Rute Maxsuelly, com orientação e suporte de Giordano Cabral. Complementada pela olaboração de membros do Grupo de pesquisa MUSTIC, do CIn - Universidade Federal de Pernambuco, são eles Horhanna Almeida, Felipe Calegário, Jader Abreu, Delando Jr. e Flaviano Dias.';
        //(s, x, y, caixa_texto_x, caixa_textoy)
        text(s, 1000, 450, 600,600);
  
}
  
function draw() {
  drawGradient(height / 2);
 
}

function drawGradient() {
  let radius = dim / 2;
  let h = random(0, 360);
    fill(h, 90, 90);
    ellipse(800,400, 20);
     ellipse(600,400, 30);
     ellipse(400,400, 40);
     ellipse(200,400, 50);
     ellipse(0,400, 100);
    h = (h + 1) % 360;
}
