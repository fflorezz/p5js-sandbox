const w = 600
const h = 600
const gridXPoints = 10
const gridYPoints = 10
const windowMargin = w / 20
let shapeSize = w / 60
let colors = [
  '#5aa9e6',
  '#7fc8f8',
  '#f9f9f9',
  '#ffe45e',
  '#ff6392',
  '#f2f7ff',
  '#c9dcff',
  '#b2c9ff',
  '#be99ff',
  '#9d71e8',
  '#f0eafc',
  '#d8e5fa',
  '#c0e1f9',
  '#a9dcf7',
  '#91d7f5',
  '#79d3f4',
  '#61cef2',
]

function setup() {
  createCanvas(w, h)
  background(random(colors))

  const grid = createGrid(gridXPoints, gridYPoints)
  // const randomGrid = grid.filter(() => random() < 0.5)

  grid.forEach(points => {
    const [x, y] = points
    renderShape(x, y, shapeSize)
  })

  ///////////////

  function renderShape(x, y, shapeSize) {
    ellipse(x, y, shapeSize)
  }

  function createGrid(xCount, yCount) {
    const defaultCount = 10

    if (!xCount) xCount = defaultCount
    if (!yCount) yCount = xCount

    const points = []

    for (let x = 0; x < xCount; x++) {
      for (let y = 0; y < yCount; y++) {
        const u = xCount <= 1 ? 0.5 : x / (xCount - 1)
        const v = yCount <= 1 ? 0.5 : y / (yCount - 1)
        const px = lerp(windowMargin, width - windowMargin, u)
        const py = lerp(windowMargin, height - windowMargin, v)
        points.push([px, py])
      }
    }
    return points
  }
}

function draw() {}
