import { Simulator } from '@/Basic/Simulator'
import Bacteria from '@/Basic/Components/Bacteria'
import Util from '@/Basic/Util'


document.addEventListener("DOMContentLoaded", async() => {
  const canvas: any = document.getElementById("canvas")
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d")
  const FPS = 30
  const option = {
    width: 800,
    height: 600
  }

  /* init simulator */
  const simulator = new Simulator(ctx, option.width, option.height)
  for(let i=0;i<10;i++) {
    let width = 20
    let height = 20
    let x = Util.random(0, option.width - width)
    let y = Util.random(0, option.height - height)

    let bacteria = new Bacteria(ctx, simulator, 5, x, y, width, height, 2, "#FBCEB1")
    bacteria.gene.initRandom()
    simulator.add('Bacteria', bacteria)
  }
  
  /* test */
  await simulator.test(200, FPS)
})