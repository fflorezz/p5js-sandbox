document.querySelector('#app').innerHTML = `
  <h1>Perlin noise</h1>
`

let xOff = 0
let yOff = 0
let zOff = 1
let wOff = 2
let size = 3
let colors = [
  '#03045e',
  '#023e8a',
  '#0077b6',
  ' #0096c7',
  '#00b4d8',
  '#48cae4',
  ' #90e0ef',
  '#ade8f4',
  '#caf0f8',
]

function setup() {
  createCanvas(400, 400)
  background(220)
}

function draw() {
  let x = map(noise(xOff), 0, 1, 0, width)
  let y = map(noise(yOff), 0, 1, 0, height)
  let color = random(colors)

  noStroke()
  fill(color)
  ellipse(x, y, sizeShape + xOff)

  let z = map(noise(zOff), 0, 1, 0, width)
  let w = map(noise(wOff), 0, 1, 0, height)
  noStroke()
  fill(color)
  ellipse(z, w, sizeShape + wOff)

  xOff += 0.005
  yOff += 0.01
  zOff += 0.005
  wOff += 0.01
}
