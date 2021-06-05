import { Component } from './basic/Component'

document.addEventListener("DOMContentLoaded", () => {
    
  const canvas: any = document.getElementById("canvas")
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d")
  const FPS = 30
  const width = 800
  const height = 600

  const test = new Component(ctx, 0, 0, 10, 10, 0)
  test.draw()
  
})