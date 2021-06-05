import { Component } from './basic/Component'
import { Simulator } from './basic/Simulator'


document.addEventListener("DOMContentLoaded", () => {
    
  const canvas: any = document.getElementById("canvas")
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d")
  const FPS = 30
  const option = {
    width: 800,
    height: 600
  }

  /* component draw */
  let test = new Component(ctx, 100, 20, 20, 20, 0)
  // test.draw()
  
  /* component simulate */
  const simulator = new Simulator(ctx, option.width, option.height)
  simulator.add('test unit', test)

})