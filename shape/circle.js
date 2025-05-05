var originX = 0;
var originY = 0;

function setPixel(x, y) {
  // x = floor(x); y = floor(y)
  x = round(x), y = round(y)
  rect(x*20, y*20, 20, 20)
}

function drawCircle(centerX, centerY, radius) {
  const squareRadius = radius*radius;
  for (let curX = centerX - radius - 1; curX <= centerX + radius; curX++) {
    for (let curY = centerY - radius - 1; curY <= centerY + radius; curY++) {
      let term1 = curX - centerX
      let term2 = curY - centerY
      if (term1*term1 + term2*term2 <= squareRadius) {
        setPixel(curX, curY);
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
  let radius = sqrt((ox-mx)*(ox-mx) + (oy-my)*(oy-my))
  drawCircle(ox, oy, radius)
}
