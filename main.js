import './style.css'
import p5 from 'p5'

document.querySelector('#app').innerHTML = `
  <h1>Hello P5JS!</h1>
`

const sketch = s => {
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
      s.mouseX >= x - size / 2 &&
      s.mouseX <= x + size / 2 &&
      s.mouseY >= y - size / 2 &&
      s.mouseY <= y + size / 2
    ) {
      return true
    } else {
      return false
    }
  }

  s.setup = () => {
    s.createCanvas(cW, cH)
    s.rectMode(s.CENTER)
  }

  s.draw = () => {
    s.background(200)

    sqs.forEach(sq => {
      s.push()
      s.translate(sq.pX, sq.pY)
      if (isOver(sq.pX, sq.pY, sqSize + sqPad)) {
        s.fill(100)
        s.rotate(angle)
      }
      s.rect(0, 0, sqSize)
      s.pop()
    })

    angle += 0.2
  }
}

let myp5 = new p5(sketch)
