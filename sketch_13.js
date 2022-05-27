const w = 1920
const h = 1920
let colors = ['#F7F7F7', '#FFBC97', '#FF7800', '#FFE300']

function setup() {
  createCanvas(w, h)
  background(colors.pop(shuffle(colors, true)))
  noLoop()
}

function draw() {
  let prevWeight = 0
  let prevColor = random(colors)
  let step = 0

  for (let x = 0; x <= w; x += step) {
    const weight = random(w / 20)
    const fillColor = setDiffColor(prevColor)

    drawingContext.shadowBlur = w / 130
    drawingContext.shadowColor = color(0, 100)

    strokeWeight(weight)
    stroke(fillColor)
    line(x, 0, x, h)
    prevWeight = weight
    prevColor = fillColor
    step = weight / 2 + prevWeight / 2

    const randomY = random(h)
    strokeWeight(random(w / 20))
    strokeCap(SQUARE)
    stroke(setDiffColor(fillColor))
    line(0, randomY, random(w / 1.5), randomY)
    line(random(w / 3, w / 1.2), randomY, w, randomY)
  }
  function setDiffColor(prevColor) {
    let newColor = random(colors)
    while (prevColor == newColor) newColor = setDiffColor(prevColor)
    return newColor
  }

  ///////

  createGrain()

  function createGrain() {
    const gridXPoints = 10
    const gridYPoints = 10
    const windowMargin = 0

    class Shape {
      constructor({ point, color, size }) {
        const [x, y] = point
        this.x = x
        this.y = y
        this.size = size
        this.color = color
      }
      render() {
        push()
        noStroke()
        fill(this.color)
        rect(this.x, this.y, this.size, random(h))
        pop()
      }
    }

    const grid = createGrid(gridXPoints, gridYPoints)
    const randomGrid = grid.filter(() => random() < 0.5)
    const shapeList = createShapeList(randomGrid)

    shapeList.forEach(shape => {
      shape.render()
    })

    function createShapeList(grid) {
      const shapeList = []

      grid.forEach(point => {
        const porperties = {}

        porperties.point = point
        porperties.size = random(w / 200, w / 50)
        porperties.color = color(random(colors))

        const shape = new Shape(porperties)

        shapeList.push(shape)
      })

      return shapeList
    }

    function createGrid(xCount, yCount) {
      const defaultCount = 10

      if (!xCount) xCount = defaultCount
      if (!yCount) yCount = xCount

      const grid = []

      for (let y = 0; y < yCount; y++) {
        for (let x = 0; x < xCount; x++) {
          const u = xCount <= 1 ? 0.5 : x / (xCount - 1)
          const v = yCount <= 1 ? 0.5 : y / (yCount - 1)
          const px = lerp(windowMargin, width - windowMargin, u)
          const py = lerp(windowMargin, height - windowMargin, v)
          grid.push([px, py])
        }
      }
      return grid
    }
  }
}
