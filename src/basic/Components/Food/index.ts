import { Component } from "@/Basic/Components/Component"

export default class Food extends Component {

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    direction: number,
    color: string = '#00FFFF',
    shape: 'circle' | 'square' = 'square') {
    
    super(ctx, x, y, width, height, direction, color, shape)
    
    /* init */
  }

  // override
  evaluation() {}

  // oberride
  step() {}

  // override
  clear() {}
}