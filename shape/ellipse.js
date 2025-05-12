var originX = 0;
var originY = 0;

function setPixel(x, y) {
  let dx = x; let dy = y;
  x = floor(x); y = floor(y)
  // x = round(x), y = round(y)
  rect(x*20, y*20, 20, 20)
  // print("set pixel: ", x, y)
  
  rect(dx*20-2, dy*20-2, 4, 4)
}

function drawEllipse(cx, cy, a, b) {
  a = floor(a); b = floor(b);
  const a2 = floor(a*a); const b2 = floor(b*b);
  
  
  const errorFunc = function(x, y) {
    return abs(b2*x*x + a2*y*y - a2*b2);
  }
  
  let err = 0;
  let curX = 0; let curY = floor(b);
  for (curX = 0 ; curX <= a; ) {
    setPixel(cx + curX, cy + curY);
    // setPixel(cx + curX, cy - curY);
    // setPixel(cx - curX, cy + curY);
    // setPixel(cx - curX, cy - curY);
    
    if (errorFunc(curX+1, curY) > errorFunc(curX, curY)) curY -= 1;
    curX += 1;
  }
  
  curX = floor(a); curY = 0;
  for (curY = 0 ; curY <= b; ) {
    setPixel(cx + curX, cy + curY);
    // setPixel(cx + curX, cy - curY);
    // setPixel(cx - curX, cy + curY);
    // setPixel(cx - curX, cy - curY);
    
    if (errorFunc(curX, curY+1) > errorFunc(curX, curY)) curX -= 1;
    curY += 1;
  }
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

function drawCircleBre(centerX, centerY, radius) {
  function d(a, b, r) {
    return a*a + b*b - r*r;
  }
  
  let x = radius; let y = 0;
  let dM = 3-2*radius;
  for (y = 0; y<=x; 0) {
    setPixel(centerX + x, centerY + y);
    setPixel(centerX - x + 1, centerY + y);
    setPixel(centerX + x, centerY - y);
    setPixel(centerX - x + 1, centerY - y);
    setPixel(centerX + y, centerY + x);
    setPixel(centerX - y, centerY + x);
    setPixel(centerX + y, centerY - x + 1);
    setPixel(centerX - y, centerY - x + 1);
    
    y++;
    if (dM > 0) {
      x--;
      dM += 4*(y-x) + 10;
    } else {
      dM += 4*y + 6;
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
  // console.log(originX, originY)
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
  // drawCircle(ox, oy, radius)
  // drawCircleBre(ox, oy, radius)
  console.log(a, b)
  drawEllipse(ox, oy, abs(a), abs(b))
  
  fill('blue')
  setPixel(ox, oy)
}
