document.querySelector('#app').innerHTML = `
  <h1>Harvest</h1>
`
const w = 600
const h = 600

function setup() {
  createCanvas(w, h)
  pixelDensity(1)
}

function draw() {
  loadPixels()

  const cons = 0.03

  let yOff = 0
  for (let x = 0; x < w; x++) {
    let xOff = 0
    for (let y = 0; y < h; y++) {
      let index = (x + y * w) * 4
      const r = random(255)
      const n = noise(xOff, yOff) * 255
      pixels[index] = n
      pixels[index + 1] = n
      pixels[index + 2] = n
      pixels[index + 3] = 255
      xOff += cons
    }
    yOff += cons
  }

  updatePixels()
}
