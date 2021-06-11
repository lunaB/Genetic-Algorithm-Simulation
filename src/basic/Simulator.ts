import { Component } from "./Component";

export class Simulator {
  constructor(
    public ctx: CanvasRenderingContext2D,
    public width: number,
    public height: number,
    public components: { [name: string]: Array<Component> } = {}){

    /* init */
  }

  setComponents(components = {}) {
    this.components = components
  }

  add(name: string, component: Component) {
    if(!(name in this.components)) {
      this.components[name] = []
    }
    this.components[name].push(component)
  }

  // step
  step() {
    for(let k in this.components){
      for(let i=0;i<this.components[k].length;i++) {
        let component = this.components[k][i]
        component.step() // no draw
      }
    }
  }

  // step -> simulate
  simulate(step_cnt: number = 1000, draw: boolean = false) {
    if(draw) {
      for(var i=0;i<step_cnt-1;i++) {
        this.step()
      }
      this.update()
    }
    else {
      for(var i=0;i<step_cnt;i++) {
        this.step()
      }
    }
  }

  // update
  update() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    for(let k in this.components){
      for(let i=0;i<this.components[k].length;i++) {
        let component = this.components[k][i]
        component.update() // draw
      }
    }
  }

  // update -> test
  async test(step_cnt: number = 1000, FPS: number = 30) {
    let step = 0;
    return new Promise((resolve, reject) => {
      let interval = setInterval(()=> {
        this.update() // draw
        step += 1
        if(step > step_cnt) {
          clearInterval(interval)
          resolve(null)
        }
      }, FPS)
    })
  }

  clear() {
    this.components = {}
  }
}