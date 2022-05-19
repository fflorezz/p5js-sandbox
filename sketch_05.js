document.querySelector('#app').innerHTML = `
  <h1>Harvest</h1>
`
const w = 600
const h = 600
const gridXPoints = 10
const gridYPoints = 10
const windowMargin = 0
let colors = [
  '#007f5f',
  '#2b9348',
  '#55a630',
  '#80b918',
  '#aacc00',
  '#bfd200',
  '#d4d700',
  '#dddf00',
  '#eeef20',
  '#ffff3f',
]

function setup() {
  createCanvas(w, h)
  background(250)

  let y = windowMargin

  while (y < h - windowMargin) {
    let x = windowMargin
    let xOff = 0

    while (x <= w - windowMargin) {
      const dotColor = random(colors)
      noStroke()
      fill(dotColor)
      ellipse(x, y + noise(xOff) * y, 15 * noise(xOff + random(100)) + y / 10)
      x += 5
      xOff += 1
    }

    y += random(10)
    xOff += 10
  }
}

function draw() {}
