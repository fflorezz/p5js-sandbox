document.querySelector('#app').innerHTML = `
  <h1>Perlin noise 2</h1>
`

let xOff = 0
let yOff = 0
let size = 10
let life = 0
let seed = 10
let maxSize = 10
let colors = [
  [
    '#03045e',
    '#023e8a',
    '#0077b6',
    ' #0096c7',
    '#00b4d8',
    '#48cae4',
    ' #90e0ef',
    '#ade8f4',
    '#caf0f8',
  ],
  [
    '#d8f3dc',
    '#b7e4c7',
    '#95d5b2',
    '#74c69d',
    '#52b788',
    '#40916c',
    '#2d6a4f',
    '#1b4332',
    '#081c15',
  ],
  [
    '#03071e',
    '#370617',
    '#6a040f',
    '#9d0208',
    '#d00000',
    '#dc2f02',
    '#e85d04',
    '#f48c06',
    '#faa307',
    '#ffba08',
  ],
]
let palette = colors[0]

function setup() {
  createCanvas(1280, 900)
  background(250)
}

function draw() {
  noiseSeed(seed)
  let x = map(noise(xOff), 0, 1, 0, width)
  let y = map(noise(yOff), 0, 1, 0, height)
  let nSize = map(noise(yOff), 0, 1, 0, maxSize)
  let color = random(palette)

  if (life < 100) {
    noStroke()
    fill(color)
    ellipse(x, y, nSize)
  } else {
    life = 0
    seed = random(200)
    palette = random(colors)
    maxSize = random(40)
  }

  life++

  xOff += 0.012
  yOff += 0.025
}
