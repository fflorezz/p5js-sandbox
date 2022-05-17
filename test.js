let x = 0
let y = 0
let angle = 0.0
let sqSize = 20
let sqPad = 10

const cW = 400
const cH = 400

const sqs = []

for (let x = sqSize; x < cW; x += sqSize + sqPad) {
  for (let y = sqSize; y < cH; y += sqSize + sqPad) {
    sqs.push({ pX: x, pY: y })
  }
}

function isOver(x, y, size) {
  if (
    mouseX >= x - size / 2 &&
    mouseX <= x + size / 2 &&
    mouseY >= y - size / 2 &&
    mouseY <= y + size / 2
  ) {
    return true
  } else {
    return false
  }
}

setup = () => {
  createCanvas(cW, cH)
  rectMode(CENTER)
}

draw = () => {
  background(200)

  sqs.forEach(sq => {
    push()
    translate(sq.pX, sq.pY)
    if (isOver(sq.pX, sq.pY, sqSize + sqPad)) {
      fill(100)
      rotate(angle)
    }
    rect(0, 0, sqSize)
    pop()
  })

  angle += 0.2
}
