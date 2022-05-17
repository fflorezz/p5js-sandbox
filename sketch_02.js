document.querySelector('#app').innerHTML = `
  <h1>Random Shapes with grid</h1>
`
const w = 600
const h = 600
const gridFraction = w / 70
const gridXPoints = w / gridFraction
const gridYPoints = h / gridFraction
const grid = createGrid(gridXPoints, gridYPoints)
const windowMargin = w / 20
const sizeRange = { min: w / 500, max: w / 16 }
const backgroundColor = 250
const randomCutoff = 0.5
const rotationRange = { min: 0, max: 30 }
let canvas
let colors = [
  '#d8f3dc',
  '#b7e4c7',
  '#95d5b2',
  '#74c69d',
  '#52b788',
  '#40916c',
  '#2d6a4f',
  '#1b4332',
  '#081c15',
]

function createGrid(xCount, yCount) {
  const defaultCount = 10

  if (!xCount) xCount = defaultCount
  if (!yCount) yCount = xCount

  const points = []

  for (let x = 0; x < xCount; x++) {
    for (let y = 0; y < yCount; y++) {
      const u = xCount <= 1 ? 0.5 : x / (xCount - 1)
      const v = yCount <= 1 ? 0.5 : y / (yCount - 1)
      points.push([u, v])
    }
  }
  return points
}

function setup() {
  canvas = createCanvas(w, h)
  background(backgroundColor)

  const randomGrid = grid.filter(() => random() < randomCutoff)
  const objList = randomGrid.map(point => {
    return createObject(point)
  })

  renderObjList(objList, 'circle')

  //////////////////////////////////////

  function createObject(point) {
    const [u, v] = point
    const x = lerp(windowMargin, w - windowMargin, u)
    const y = lerp(windowMargin, h - windowMargin, v)
    const rotation = lerp(rotationRange.min, rotationRange.max, noise(u, v))
    const size = lerp(sizeRange.min, sizeRange.max, noise(u, v))
    const fillColor = random(colors)

    return {
      position: [x, y],
      size,
      fillColor,
      rotation,
    }
  }

  function renderObjList(objList, shape) {
    const shapeList = {
      circle: circleShape,
      arrow: arrowShape,
    }
    objList.forEach(obj => {
      shapeList[shape](obj)
    })
  }

  function circleShape({ position, fillColor, size }) {
    const [x, y] = position
    noFill()
    stroke(fillColor)
    ellipse(x, y, size / 3)
  }

  function arrowShape({ position, fillColor, size, rotation }) {
    const [x, y] = position
    push()
    noStroke()
    fill(fillColor)
    textSize(size)
    translate(x, y)
    rotate(rotation)
    text('↑', 0, 0)
    pop()
  }
}

function draw() {}
