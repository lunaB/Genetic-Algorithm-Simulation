import { Simulator } from '@/Basic/Simulator'
import Bacteria from '@/Basic/Components/Bacteria'
import Util from '@/Basic/Util'
import Food from '@/Basic/Components/Food'
import { Selection, Crossover, Mutation } from '@/Basic/GA'
import { Component } from '@/Basic/Component'


document.addEventListener("DOMContentLoaded", async() => {
  const canvas: any = document.getElementById("canvas")
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d")
  const FPS = 20
  const option = {
    width: 800,
    height: 600
  }
  
  const env = {
    food: {
      num: 200,
      size: 10
    },
    bacteria: {
      num: 20,
      size: 20
    },
    generation: 100,
    step: 1000,
    mutations: 0.15
  }

  /* add simulator */
  const simulator = new Simulator(ctx, option.width, option.height)
  
  /* first add bacteria */
  for(let i=0;i<env.bacteria.num;i++) {
    let width = env.bacteria.size
    let height = env.bacteria.size
    let x = Util.random(0, option.width - width)
    let y = Util.random(0, option.height - height)

    let bacteria = new Bacteria(ctx, simulator, 5, x, y, width, height, 2, "#FBCEB1")
    bacteria.gene.initRandom()
    simulator.add('Bacteria', bacteria)
  }

  for(let g=0;g<env.generation;g++){
    console.log('========[generation %d]========', g)
    /* add food */
    console.log('** add food')
    for(let i=0;i<env.food.num;i++) {
      let width = env.food.size
      let height = env.food.size
      let x = Util.random(0, option.width - width)
      let y = Util.random(0, option.height - height)

      let food = new Food(ctx, x, y, width, height, 0, '#FF0000')
      simulator.add('Food', food)
    }
    /* test */
    console.log('** test')
    // simulator.simulate(env.step)
    await simulator.test(env.step, FPS)
    /* selection */
    let pairs = Selection.rouletteWheelSelection(<Array<Bacteria>>simulator.components['Bacteria'], env.bacteria.num)
    console.log('** selection %d pair', pairs.length)
    /* crossover */
    let genes = Crossover.crossover(pairs)
    console.log('** crossover %d gene', genes.length)
    /* add new generation */
    if(g != env.generation - 1) {
      simulator.clear()
      let m = 0
      for(let v of genes) {
        let width = env.bacteria.size
        let height = env.bacteria.size
        let x = Util.random(0, option.width - width)
        let y = Util.random(0, option.height - height)

        let bacteria = new Bacteria(ctx, simulator, 5, x, y, width, height, 2, "#FBCEB1")
        bacteria.gene.setChromosome(v)
        bacteria.clear()
        let o = Mutation.mutation(bacteria, env.mutations)
        if(o) m += 1
        simulator.add('Bacteria', bacteria)
      }
      console.log('** mutation %d/%d', m, env.bacteria)
    }
  }

  /* Done */
  console.log('========[Done]========')
  // let bestBacteria = <Bacteria>Component.evaluationSort(<Array<Component>>simulator.components['Bacteria'])[0]
  // simulator.clear()
  // for(let i=0;i<env.bacteria;i++) {
  //   let width = 20
  //   let height = 20
  //   let x = Util.random(0, option.width - width)
  //   let y = Util.random(0, option.height - height)

  //   let bacteria = new Bacteria(ctx, simulator, 5, x, y, width, height, 2, "#FBCEB1")
  //   bacteria.gene.setChromosome(bestBacteria.gene.chromosome)
  //   simulator.add('Bacteria', bacteria)
  // }
  // for(let i=0;i<env.food;i++) {
  //   let width = 10
  //   let height = 10
  //   let x = Util.random(0, option.width - width)
  //   let y = Util.random(0, option.height - height)

  //   let food = new Food(ctx, x, y, width, height, 0, '#FF0000')
  //   simulator.add('Food', food)
  // }
  // console.log('** test')
  // await simulator.test(env.step, FPS)

  let bacterias = <Array<Bacteria>>Component.evaluationSort(<Array<Component>>simulator.components['Bacteria'])
  simulator.clear()
  for(let i=0;i<env.bacteria.num;i++) {
    let width = env.bacteria.size
    let height = env.bacteria.size
    let x = Util.random(0, option.width - width)
    let y = Util.random(0, option.height - height)

    let bacteria = new Bacteria(ctx, simulator, 5, x, y, width, height, 2, "#FBCEB1")
    bacteria.gene.setChromosome(bacterias[i].gene.chromosome)
    simulator.add('Bacteria', bacteria)
  }
  for(let i=0;i<env.food.num;i++) {
    let width = env.food.size
    let height = env.food.size
    let x = Util.random(0, option.width - width)
    let y = Util.random(0, option.height - height)

    let food = new Food(ctx, x, y, width, height, 0, '#FF0000')
    simulator.add('Food', food)
  }
  console.log('** test')
  await simulator.test(env.step, FPS)
})