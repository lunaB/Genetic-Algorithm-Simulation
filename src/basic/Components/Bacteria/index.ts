import { Component } from "@/Basic/Component"
import { Simulator } from "@/Basic/Simulator";
import { BacteriaGene } from "./BacteriaGene";

export default class Bacteria extends Component {

  gene: BacteriaGene
  move_iter: number
  fullness: number
  escapeScore: number

  constructor(
    ctx: CanvasRenderingContext2D,
    public simulator: Simulator,
    public speed: number,
    x: number,
    y: number,
    width: number,
    height: number,
    direction: number,
    color: string = '#00FFFF',
    shape: 'circle' | 'square' = 'square') {
    
    super(ctx, x, y, width, height, direction, color, shape)
    
    /* init */
    this.gene = new BacteriaGene(20)
    this.move_iter = 0
    this.fullness = 0
    this.escapeScore = 10
  }

  // override
  evaluation() {
    let res = this.fullness //+ Math.max(0, this.escapeScore)
    return res
  }

  // override
  step() {
    // move system
    if(this.gene.move_system.length) {
      if(this.move_iter == this.gene.move_system.length) {
        this.move_iter = 0
      }

      let ms = this.gene.move_system[this.move_iter]
      let direction = ms[0]
      let speed_rate = ms[1]

      super.move(direction, this.speed * speed_rate)

      this.move_iter += 1
    }
    
    // phagocytosis
    // 한 step에 한개만 먹을 수 있슴
    if('Food' in this.simulator.components) {
      for(let i=0;i<this.simulator.components['Food'].length;i++) {
        let food = this.simulator.components['Food'][i]
        if(this.x < food.x + food.width && 
          this.x + this.width > food.x &&
          this.y < food.y + food.height &&
          this.y + this.height > food.y) {
          
          this.fullness += 1
          this.simulator.components['Food'].splice(i, 1)
          break
        }
      }
    }

    // escape screan
    if(this.x < 0 || this.x+this.width > this.simulator.width ||
      this.y < 0 || this.y+this.height > this.simulator.height) {
      this.escapeScore -= 0.1
    }
  }

  // override
  clear() {
    this.fullness = 0
    this.escapeScore = 10
  }
}