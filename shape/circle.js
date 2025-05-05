var originX = 0;
var originY = 0;

function setPixel(x, y) {
  x = floor(x); y = floor(y)
  // x = round(x), y = round(y)
  rect(x*20, y*20, 20, 20)
}

function drawCircle(centerX, centerY, radius) {
  const squareRadius = radius*radius;
  for (let ofX = 0; ofX < radius; ofX++) {
    for (let ofY = 0; ofY < radius; ofY++) {
      if (ofX*ofX + ofY*ofY < squareRadius) {
        setPixel(centerX + ofX, centerY + ofY);
        setPixel(centerX - ofX, centerY + ofY);
        setPixel(centerX + ofX, centerY - ofY);
        setPixel(centerX - ofX, centerY - ofY);
      }
    }
  }
}

function setup() {
  createCanvas(400, 400);
}

function gatherInput() {
  let spd = 2;
  if (keyIsDown(SHIFT)) spd = 4;
  
  if (keyIsDown(UP_ARROW)) {
    originY = originY - spd;
  } 
  if (keyIsDown(DOWN_ARROW)) {
    originY = originY + spd;
  }
  if (keyIsDown(LEFT_ARROW)) {
    originX = originX - spd;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    originX = originX + spd;
  }
  console.log(originX, originY)
}

function draw() {
  gatherInput();
  background(220);
    //draw bg
  color('black')
  fill('white')
  for (const bgx of Array(20).keys()) {
    for (const bgy of Array(20).keys()) {
      setPixel(bgx, bgy)
      // console.log(bgx, bgy)
    }
  }
  
  color('black')
  fill('red')
  let mx = floor(mouseX/20); let my = floor(mouseY/20);
  let ox = floor(originX/20); let oy = floor(originY/20);
  
  // let mx = mouseX/20; let my = mouseY/20;
  // let ox = originX/20; let oy = originY/20;
  let a = originX - mouseX; let b = originY - mouseY;
  a /= 20; b /= 20; let radius = sqrt(a*a + b*b)
  // let radius = sqrt((ox-mx)*(ox-mx) + (oy-my)*(oy-my))
  drawCircle(ox, oy, radius)
  
  fill('blue')
  setPixel(ox, oy)
}
