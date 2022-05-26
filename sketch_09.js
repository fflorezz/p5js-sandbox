const w = 1980
const h = 1980
const gridXPoints = 50
const gridYPoints = 50
const windowMargin = 0
let colors = [
  '#ff6d00',
  '#ff7900',
  '#ff8500',
  '#ff9100',
  '#ff9e00',
  '#240046',
  '#3c096c',
  '#5a189a',
  '#7b2cbf',
  '#9d4edd',
]

function setup() {
  createCanvas(w, h)
  background(random(colors))

  const grid = createGrid(gridXPoints, gridYPoints)
  const randomGrid = grid.filter(() => random() < 0.5)

  let sizeOff = 0
  randomGrid.forEach(points => {
    const [x, y] = points
    const shapeSize = lerp(1, w / 35, noise(x, y))

    noStroke()
    fill(random(colors))
    renderShape(x, y, shapeSize)

    if (random() < 0.5) {
      for (let i = shapeSize / 4; i < random(w / 70, w); i += shapeSize / 4) {
        renderShape(x, y + i, shapeSize - i / 30)
      }
    }

    sizeOff += 0.001
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
