import { Gene } from "../../Gene"


export default class BacteriaGene extends Gene {

  move_system: Array<[number, number]> = []

  constructor(
    chromosome_size: number,
    chromosome: Array<any> = []) {

    super(chromosome_size, ['A','G','C','T'], chromosome)
    /* init */
  }

  // override
  initSystem() {
    let start = false
    let ms_tmp = []
    for(var i=2;i<this.chromosome.length;i++) {
      // push
      if(start) {
        ms_tmp.push(this.chromosome[i])
      }
      // movement system start [A, G, C]
      else if(
        this.chromosome[i-2] == 'A' && 
        this.chromosome[i-1] == 'G' &&
        this.chromosome[i] == 'C') {
        
        start = true
      }
    }

    // drop odd
    if(ms_tmp.length % 2 != 0) {
      ms_tmp.pop()
    }

    // pair set
    while(ms_tmp.length) {
      let sp = ms_tmp.splice(0,2)
      let ms: [number, number] = [0, 0]

      if(sp[0] == 'A') ms[0] = 0
      else if(sp[0] == 'G') ms[0] = 90
      else if(sp[0] == 'C') ms[0] = 180
      else if(sp[0] == 'T') ms[0] = 270
        
      if(sp[1] == 'A') sp[1] = ms[1] = 1
      else if(sp[1] == 'G') ms[1] = 0.9
      else if(sp[1] == 'C') ms[1] = 0.8
      else if(sp[1] == 'T') ms[1] = 0.7
      
      this.move_system.push(ms);
    }
  }
}