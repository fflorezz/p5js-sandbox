document.querySelector('#app').innerHTML = `
  <h1>Harvest</h1>
`
const w = 600
const h = 600
let colors = ['#0c0f0a', '#ff206e', '#fbff12', '#41ead4']

function setup() {
  createCanvas(w, h)
  background(250)

  const cons = 1
  let yOff = 0

  for (let y = 0; y <= w; y += 1) {
    let xOff = 0
    const r = random(100)

    noFill()
    stroke(random(colors))
    strokeWeight(20)

    beginShape()

    for (let x = 0; x <= h; x += 20) {
      const n = noise(xOff, yOff) * r
      vertex(x, y + n)
      xOff += cons
    }
    endShape()

    yOff += cons
  }
}

function draw() {}
