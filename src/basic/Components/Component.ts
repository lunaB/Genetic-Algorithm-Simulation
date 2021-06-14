export default abstract class Component {

  public UID: number;
  static generateUID: number = 0

  constructor(
    public ctx: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public direction: number,
    public color: string = '#00FFFF',
    public shape: 'circle' | 'square' = 'square') {

    this.UID = Component.generateUID
    Component.generateUID += 1
  }

  draw() {
    this.ctx.save()
    this.ctx.translate(this.x, this.y)
    this.ctx.fillStyle = this.color
    this.ctx.fillRect(0, 0, this.width, this.height)
    
    const center = {
      x: this.x + this.width * 0.5, 
      y: this.y + this.height * 0.5
    }
    
    this.ctx.translate(center.x, center.y)
    this.ctx.rotate((Math.PI / 180) * this.direction)
    this.ctx.translate(-center.x, -center.y)
    this.ctx.restore();
  }

  move(direction: number, distence: number) {
    this.x += distence * Math.cos(direction)
    this.y += distence * Math.sin(direction)
  }

  moveTo(component: Component, distence: number) {
    const x = component.x
    const y = component.y
    const dx = x - this.x
    const dy = y - this.y
    const radian = Math.atan2(y, x)
    /* 미완 */
  }

  abstract evaluation(): any

  abstract step(): any

  abstract clear(): void

  update() {
    this.step()
    this.draw()
  }

  static evaluationSort(components: Array<Component>) {
    let evaluation = components.sort((a, b) => {
      return b.evaluation() - a.evaluation()
    })
    return evaluation
  }

  clone() {
    return this.cloneObject(this)
  }
  private cloneObject(obj: any) {
    let clone: any = {};
    for (let key in obj) {
      if (typeof obj[key] == "object" && obj[key] != null) {
        clone[key] = this.cloneObject(obj[key]);
      } else {
        clone[key] = obj[key];
      }
    }
    return clone;
  }

}