export abstract class Gene {
  constructor(
    public chromosome_size: number,
    public chromosome_base: Array<number | string>,
    public chromosome: Array<any> = []) {

    /* init */
  }

  abstract initSystem(): void

  initRandom() {
    for(let i=0;i<this.chromosome_size;i++) {
      let base = Math.floor(Math.random()*this.chromosome_base.length)
      this.chromosome.push(this.chromosome_base[base])
    }
    this.initSystem()
  }

  setChromosome(chromosome: Array<any>) {
    this.chromosome = chromosome
    this.initSystem()
  }
}