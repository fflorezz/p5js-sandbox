document.querySelector('#app').innerHTML = `
  <h1>Random Shapes with grid</h1>
`
const w = 2080
const h = 2080
const gridFraction = w / 20
const gridXPoints = w / gridFraction
const gridYPoints = h / gridFraction
const grid = createGrid(gridXPoints, gridYPoints)
const windowMargin = w / 15
const backgroundColor = 250
const rotationRange = { min: 0, max: 30 }
const shapeCount = 100
const pointsCount = 5
const randomCutoff = 0.5
const sizeRange = { min: w / 500, max: w / 27 }
let colors = ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff']

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
  createCanvas(w, h)
  background(backgroundColor)

  const randomGrid = grid.filter(() => random() < randomCutoff)
  const objList = randomGrid.map(point => {
    return createObject(point)
  })

  renderObjList(objList, 'circle')

  for (let i = 0; i < shapeCount; i++) {
    random([createRandomShapeFill, createRandomShapeStroke])()
  }

  //////////////////////////////////////

  function createRandomShapeStroke() {
    const points = random(pointsCount)
    noFill()
    strokeWeight(random(5))
    stroke(random(colors))

    beginShape()
    noiseSeed(random(100))
    for (let i = 0; i < points; i++) {
      vertex(random(w), random(h))
    }

    endShape(CLOSE)
  }

  function createRandomShapeFill() {
    const points = random(pointsCount)

    noStroke()
    fill(random(colors))
    noiseSeed(random(100))
    beginShape()

    for (let i = 0; i < points; i++) {
      vertex(noise(i) * w, noise(i * 5) * h)
    }

    endShape(CLOSE)
  }

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
    }
    objList.forEach(obj => {
      shapeList[shape](obj)
    })
  }

  function circleShape({ position, fillColor, size }) {
    const [x, y] = position
    noStroke()
    fill(fillColor)
    ellipse(x, y, size / 3)
  }
}

function draw() {}
