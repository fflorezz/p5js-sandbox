document.querySelector('#app').innerHTML = `
  <h1>Sorting Shapes</h1>
`
const w = 1980
const h = 1980
const gridXPoints = 200
const gridYPoints = 200
const windowMargin = 0
let sizeShape = w / 10
let colors = [
  '#5aa9e6',
  '#7fc8f8',
  '#f9f9f9',
  '#ffe45e',
  // '#ff6392',
  '#f2f7ff',
  '#c9dcff',
  '#b2c9ff',
  // '#be99ff',
  // '#9d71e8',
  '#f0eafc',
  '#d8e5fa',
  '#c0e1f9',
  // '#a9dcf7',
  // '#91d7f5',
  // '#79d3f4',
  '#61cef2',
]

function setup() {
  createCanvas(w, h)
  background(random(colors))

  let xOff = 0
  let yOff = 0
  let consX = 0.3
  const consY = 0.5
  const sumPointList = []

  const grid = createGrid(gridXPoints, gridYPoints)

  const randomGrid = grid.filter(() => random() < 0.5)

  randomGrid.forEach(points => {
    const [x, y] = points
    renderShape(x, y)
  })

  ///////////////

  function renderShape(x, y) {
    let newPointList = []
    let sizeI = sizeShape

    for (let i = 0; i < 10; i++) {
      fill(random(colors))
      const newPoint = [
        x + noise(xOff) * random(w / 100),
        y + noise(yOff) * random(w / 100),
      ]

      noStroke()
      rect(newPoint[0], newPoint[1], sizeShape)
      xOff += consX
      yOff += consY
      sizeI = sizeI - sizeI / 10
      newPointList.push(newPoint)
      sumPointList.push(newPoint)
    }

    if (random() < 0.9) {
      stroke(random(colors))
      strokeWeight(random(w / 50))
      const point2 = random(newPointList)
      line(x, y, point2[0], point2[1])
    }
    if (random() < 0.2) {
      stroke(random(colors))
      strokeWeight(random(w / 200))
      const point1 = random(sumPointList)
      const point2 = random(sumPointList)
      line(point1[0], point1[1], point2[0], point2[1])
    }
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
