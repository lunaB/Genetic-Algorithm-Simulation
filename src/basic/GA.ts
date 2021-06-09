import Bacteria from "@/Basic/Components/Bacteria"
import { Gene } from "@/Basic/Gene"

type SelectionResult = Array<[Bacteria, Bacteria]>
type CrossoverResult = Array<Array<string>>

export const Selection = {
  /* Selection */
  /* Roulette Wheel */
  rouletteWheelSelection(components: Array<Bacteria>, sample: number): SelectionResult {
    const sum = components.reduce((sum, v) => sum + v.evaluation(), 0)
    const select = () => {
      let r = Math.random() * sum
      let s = 0
      for(let i=0;i<components.length;i++) {
        s += components[i].evaluation()
        if(r < s) {
          return components[i]
        }
      }
    }

    let selectList = new Array()

    for(let i=0;i<sample;i++) {
      let componentA = select()
      let componentB = select()

      selectList.push([componentA, componentB])
    }
    return selectList
  }
}

export const Crossover = {
  /* Crossover */
  crossover(selection: Array<Array<Bacteria>>): CrossoverResult {

    let newChromosomes = new Array<Array<string>>()
    selection.forEach((v, i) => {
      let a = v[0].gene.chromosome
      let b = v[1].gene.chromosome
      if(a.length != b.length) {
        throw new Error('not equal chromosome length')
      }
      let r = Math.floor(Math.random() * v[0].gene.chromosome.length)
      newChromosomes.push(a.slice(0, r).concat(b.slice(r, b.length)))
    })
    return newChromosomes
  }
}

export const Mutation = {
  mutation(bacteria: Bacteria, rate: number = 0.08) {
    if(rate > Math.random()) {
      this.exchange(bacteria.gene)
      return true
    }
    else {
      return false
    }
  },
  exchange(gene: Gene) {
    let base1 = Math.floor(Math.random() * gene.chromosome_size)
    let base2 = Math.floor(Math.random() * gene.chromosome_size)
    let newChromosome = gene.chromosome
    
    let tmp = newChromosome[base1]
    newChromosome[base1] = newChromosome[base2]
    newChromosome[base2] = tmp
    
    gene.setChromosome(newChromosome)
  }
}

export const Replace = {
  replace() {

  }
}