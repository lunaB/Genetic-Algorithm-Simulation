import { Simulator } from '@/Basic/Simulator'
import Bacteria from '@/Basic/Components/Bacteria'
import Util from '@/Basic/Util'
import Food from '@/Basic/Components/Food'
import { Selection, Crossover, Mutation } from '@/Basic/GA'
import { Component } from '@/Basic/Component'


document.addEventListener("DOMContentLoaded", async() => {

  await new Promise(resolve => setTimeout(resolve, 1000))

  const canvas: any = document.getElementById("canvas")
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d")
  const FPS = 30
  const option = {
    width: 800,
    height: 600
  }
  
  const env = {
    food: {
      num: 300,
      size: 5
    },
    bacteria: {
      num: 20,
      size: 15,
      speed: 5
    },
    generation: 100,
    step: 500,
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

    let bacteria = new Bacteria(ctx, simulator, env.bacteria.speed, x, y, width, height, 2, "#FBCEB1")
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
    /* score */
    const totalScore = simulator.components['Bacteria'].reduce((s, v) => {
      return s + v.evaluation()
    }, 0)
    console.log('** generation total score : %d', totalScore)
    const sortByScore = simulator.components['Bacteria'].sort((a, b) => {
      return b.evaluation() - a.evaluation()
    })
    const top5score = sortByScore.slice(0, 5).map((v) => {
      return v.evaluation()
    })
    console.log('** generation top 5 score : '+top5score)
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

        let bacteria = new Bacteria(ctx, simulator, env.bacteria.speed, x, y, width, height, 2, "#FBCEB1")
        bacteria.gene.setChromosome(v)
        bacteria.clear()
        
        /* mutation */
        let o = Mutation.mutation(bacteria, env.mutations)
        if(o) m++
        simulator.add('Bacteria', bacteria)
      }
      console.log('** mutation %d/%d', m, env.bacteria.num)
    }
  }

  /* Done */
  console.log('========[Done]========')

  let bacterias = <Array<Bacteria>>Component.evaluationSort(<Array<Component>>simulator.components['Bacteria'])
  simulator.clear()
  for(let i=0;i<env.bacteria.num;i++) {
    let width = env.bacteria.size
    let height = env.bacteria.size
    let x = Util.random(0, option.width - width)
    let y = Util.random(0, option.height - height)

    let bacteria = new Bacteria(ctx, simulator, env.bacteria.speed, x, y, width, height, 2, "#FBCEB1")
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