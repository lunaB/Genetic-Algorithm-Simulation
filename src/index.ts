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
  const textarea = <HTMLInputElement>document.getElementById("log")
  
  const log = (x: string, obj: any = null) => {
    if(obj !== null) {
      textarea.value += x + JSON.stringify(obj) + '\n' 
    }else {
      textarea.value += x + '\n' 
    }
  }

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
    generation: 1,
    step: 100,
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
    log('[generation '+g+']================')
    /* add food */
    for(let i=0;i<env.food.num;i++) {
      let width = env.food.size
      let height = env.food.size
      let x = Util.random(0, option.width - width)
      let y = Util.random(0, option.height - height)

      let food = new Food(ctx, x, y, width, height, 0, '#FF0000')
      simulator.add('Food', food)
    }

    /* test */
    log('** test ...')
    // simulator.simulate(env.step)
    await simulator.test(env.step, FPS)
    /* score */
    const totalScore = simulator.components['Bacteria'].reduce((s, v) => {
      return s + v.evaluation()
    }, 0)
    log('** generation total score : ', totalScore)
    const sortByScore = <Array<Bacteria>>simulator.components['Bacteria'].sort((a, b) => {
      return b.evaluation() - a.evaluation()
    })
    const top5score = sortByScore.slice(0, 5).map((v) => {
      return v.evaluation()
    })
    log('** generation top 5 score : ', top5score)
    log('** best gene : ', sortByScore[0].gene.chromosome)
    /* escape loop */
    if(totalScore >= 550) {
      break
    }
    /* selection */
    let pairs = Selection.rouletteWheelSelection(<Array<Bacteria>>simulator.components['Bacteria'], env.bacteria.num)
    log('** selection pair : ', pairs.length)
    /* crossover */
    let genes = Crossover.crossover(pairs)
    log('** crossover gene : ', genes.length)
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
      log('** mutation '+m +'/'+env.bacteria.num)
    }
  }

  /* Done */
  log('[Done]=================')

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
  await new Promise(resolve => setTimeout(resolve, 2000))
  console.log('** test')
  await simulator.test(env.step, FPS)
})