2 );
  }
}

function mousePressed() {
  mousePressed1();
  mousePressed2();
  mousePressed3();
}

function mousePressed1() {
  
//light up the rectangle when clicking inside of it
  if (mouseX > width / 3 && mouseX < width / 3 * 2 && mouseY > height / 3 && mouseY < height / 3 * 2) {
    on = !on3
  }
}

function mousePressed2() {
    if (mouseX > width / 6 && mouseX < width / 6 * 2 && mouseY > height /6 && mouseY < height / 6 * 2) {
    on2 = !on2
  }
}

function mousePressed3() {
    if (mouseX > width / 2 && mouseX < width / 2 * 2 && mouseY > height /2 && mouseY < height / 2 * 2) {
    on3 = !on3
  }
}
