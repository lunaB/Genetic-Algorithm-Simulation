export default {
  random(min: number, max: number) {
    return Math.random() * (max - min) + min
  },
  randomInt(min: number, max: number) {
    return Math.floor(this.random(min, max))
  }
}