export class Gene {
  constructor(
    public chromosome_size: number,
    public chromosome_base: Array<number>,
    public chromosome: Array<any> = []) {

    /* init */
  }

  initSystem() {}

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