const w = 600
const h = 600
const gridXPoints = 10
const gridYPoints = 10
const windowMargin = w / 2
let shapeSize = w / 100
let colors = ['#f4d06f', '#ff8811', '#9dd9d2', '#fff8f0', '#392f5a']

function setup() {
  createCanvas(w, h)
  background(random(colors))

  for (let i = 0; i < 90; i++) {
    let ellipseSize = random(w / 1000)

    const ellipseColor = color(random(colors))
    ellipseColor.setAlpha(random(50, 80))

    if (random() < 0.5)
      createEllipse(random(w), random(h), ellipseSize, ellipseColor)

    if (random() < 0.2)
      createStroke(random(w), random(h), ellipseSize, ellipseColor)
  }

  function createEllipse(x, y, ellipseSize, ellipseColor) {
    let size = ellipseSize
    const inc = random(w / 100, w / 20)
    for (let i = 0; i < random(5, 10); i++) {
      noStroke()
      fill(ellipseColor)
      ellipse(x, y, size)
      size += inc
    }
  }

  function createStroke(x, y, ellipseSize, ellipseColor) {
    let size = ellipseSize
    const inc = random(w / 100, w / 15)
    for (let i = 0; i < random(5, 20); i++) {
      noFill()
      strokeWeight(random(w / 1000, w / 250))
      stroke(ellipseColor)
      ellipse(x, y, size)
      size += inc
    }
  }

  ///////////////

  createGrain()

  function createGrain() {
    const start = performance.now() //180 a 200
    const gridXPoints = 200
    const gridYPoints = 200
    const windowMargin = 0

    const grid = createGrid(gridXPoints, gridYPoints)
    const randomGrid = grid.filter(() => random() < 0.5)

    const grainColor = color(random(colors))
    grainColor.setAlpha(random(10, 50))

    randomGrid.forEach(points => {
      let shapeSize = random(w / 400, w / 200)
      const [x, y] = points
      renderShape(x, y, shapeSize)
    })

    function renderShape(x, y, shapeSize) {
      noStroke()
      fill(grainColor)
      ellipse(x, y, shapeSize)
    }

    function createGrid(xCount, yCount) {
      const defaultCount = 10

      if (!xCount) xCount = defaultCount
      if (!yCount) yCount = xCount

      const points = []

      for (let y = 0; y < yCount; y++) {
        for (let x = 0; x < xCount; x++) {
          const u = xCount <= 1 ? 0.5 : x / (xCount - 1)
          const v = yCount <= 1 ? 0.5 : y / (yCount - 1)
          const px = lerp(windowMargin, width - windowMargin, u)
          const py = lerp(windowMargin, height - windowMargin, v)
          points.push([px, py])
        }
      }
      return points
    }
    const duration = performance.now() - start
    console.log({ duration })
  }
}

function draw() {}
