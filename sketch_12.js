const w = 1980
const h = 1980
let colors = ['#f4d06f', '#ff8811', '#9dd9d2', '#fff8f0', '#392f5a']

function setup() {
  createCanvas(w, h)
  background(random(colors))
  noLoop()
}

function draw() {
  for (let i = 0; i < 25; i++) {
    let y = random(h)
    push()
    drawingContext.shadowBlur = random(w / 25, w / 12)
    drawingContext.shadowColor = random(colors)
    drawingContext.shadowOffsetY = random(-w / 100, w / 100)
    stroke(random(colors))
    strokeWeight(random(w / 6))
    line(0, y, w, y)
    pop()
  }
}
