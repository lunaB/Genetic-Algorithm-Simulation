import { Component } from './basic/Component'
import { Simulator } from './basic/Simulator'


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
    let test = new Component(ctx, 100, 20, 20, 20, 0)
    simulator.add('component', test)
  }
  
  /* test */
  // await simulator.test(500, FPS)
})