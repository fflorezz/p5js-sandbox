document.querySelector('#app').innerHTML = `
  <h1>Sorting Shapes</h1>
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
  background(random(colors))

  let grid = createGrid(gridXPoints, gridYPoints)

  const shapes = []

  while (grid.length > 2) {
    const [pointA, pointB] = shuffle(grid).slice(0, 2)

    const shape = {}

    shape.points = [
      [pointA[0], height - windowMargin],
      [pointA[0], pointA[1]],
      [pointB[0], pointB[1]],
      [pointB[0], height - windowMargin],
    ]
    shape.colorPair = shuffle(colors).slice(0, 2)
    shape.y = (pointA[1] + pointB[1]) / 2

    shapes.push(shape)

    grid = grid.filter(point => ![pointA, pointB].includes(point))
  }

  shapes.sort((a, b) => a.y - b.y)

  shapes.forEach(shape => {
    renderShape(shape)
  })

  ///////////////

  function renderShape({ points, colorPair }) {
    stroke(colors[9])
    strokeWeight(10)
    fill(colorPair[1])
    beginShape()
    points.forEach(point => {
      vertex(point[0], point[1])
    })
    endShape(CLOSE)
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
