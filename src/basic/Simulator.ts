import { Component } from "./Components/Component";
import Record from "./Record";

export type Scene = {
  [name: string]: Array<Component>
}

export class Simulator {

  record: Record
  onAir: boolean
  options: object

  constructor(
    public ctx: CanvasRenderingContext2D,
    public width: number,
    public height: number,
    public components: Scene = {}) {

    /* init */
    this.record = new Record()
    this.options = {}
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

  // draw
  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    for(let k in this.components){
      for(let i=0;i<this.components[k].length;i++) {
        let component = this.components[k][i]
        component.draw() // draw
      }
    }
  }

  // step
  step() {
    for(let k in this.components) {
      for(let i=0;i<this.components[k].length;i++) {
        let component = this.components[k][i]
        component.step() // no draw
      }
    }
  }

  // step -> simulate
  simulate(step_cnt: number = 1000, record: boolean = false) {
    if(record) this.record.addTape()
    for(var i=0;i<step_cnt;i++) {
      this.step()
      if(record) this.record.record(this.components)
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
  async test(step_cnt: number = 1000, FPS: number = 30, record: boolean = false) {
    if(record) this.record.addTape()
    let step = 0;
    return new Promise((resolve, reject) => {
      let interval = setInterval(()=> {
        this.update() // update draw
        if(record) this.record.record(this.components)
        step += 1
        if(step > step_cnt) {
          clearInterval(interval)
          resolve(null)
        }
      }, FPS)
    })
  }

  // play record
  async play(name: string, FPS: number = 30) {
    let step_cnt = this.record.tapes[name].moments.length - 1
    let step = 0;
    return new Promise((resolve, reject) => {
      let interval = setInterval(()=> {
        this.components = this.record.tapes[name].moments[step].components
        this.draw()
        step += 1
        console.log(this.components['Bacteria'].map(x=>x.x))
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