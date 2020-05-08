let seedColor = ('#ffffff');
let bgColor = (0, 255, 255);
let radius= 3;
let seeds = 2000;
 let zoom = 5;
 let angle = 50 * (Math.sqrt(5)-1) / 2;
  let opacity = 150;

 function setup() {
        createCanvas(windowWidth, windowHeight);
      // color mode used for interpreting param colors
      colorMode(HSB, 100, 255, 255, 255);

      // all angles in degrees (0 .. 360)
      angleMode(DEGREES);
      
      }
      
function draw() {

      // hello darkness my old friend
      background(bgColor);

      // let the seeds be filleth
      let c = color(seedColor);
      fill(hue(c), saturation(c),brightness(c), opacity );
      stroke(0, opacity);

      // absolute radius
      let r = radius * zoom;

      push();

      // go to the center of the sunflower
      translate(width/2, height/2);

      // rotate around the center while going outwards
      for(let i = 0; i < seeds; i++) {
        push();
        rotate(i * angle);
        // distance to the center of the sunflower
        let d = sqrt(i + 0.5) * zoom;
        ellipse(d, 0, r, r);
        pop();
      }
      pop();
    }
