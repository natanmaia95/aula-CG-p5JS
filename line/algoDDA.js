var originX = 0;
var originY = 0;

function setPixel(x, y) {
  // x = floor(x); y = floor(y)
  x = round(x), y = round(y)
  rect(x*20, y*20, 20, 20)
}


function drawLineDDA(x1, y1, x2, y2) {
  let tHistory = []
  const deltaMax = max(abs(x2-x1), abs(y2-y1));
  for (i = 0; i < deltaMax; i++) { // ++i?
    t = i/deltaMax;
    //linear interpolation
    xToDraw = x1 + (x2-x1)*t;
    yToDraw = y1 + (y2-y1)*t;
    xtoDraw = round(xToDraw); yToDraw = round(yToDraw);
    setPixel(xToDraw, yToDraw);
    // tHistory.push(t.toFixed(2))
    // tHistory.push(xToDraw.toFixed(2).toString() + " " + yToDraw.toFixed(2).toString())
  }
  // console.log(tHistory)
  
  setPixel(x2, y2);
}





function setup() {
  createCanvas(400, 400);
}

function draw() {
  gatherInput()
  
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
  
  //draw line
  color('black')
  fill('red')
  mousePixelX = floor(mouseX/20)
  mousePixelY = floor(mouseY/20)
  drawLineDDA(floor(originX/20),floor(originY/20), mousePixelX, mousePixelY)
  
  //draw ref point
  fill('blue')
  rect(originX-4, originY-4, 8, 8)
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
