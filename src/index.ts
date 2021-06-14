import Simulator from '@/Basic/Simulator'
import Bacteria from '@/Basic/Components/Bacteria'
import Util from '@/Basic/Util'
import Food from '@/Basic/Components/Food'
import { Selection, Crossover, Mutation } from '@/Basic/GA'
import Component from '@/Basic/Components/Component'
import Chart from '@/Basic/Analysis/Graph'
import Record from '@/Basic/Record'

document.addEventListener("DOMContentLoaded", async() => {

  const sleep = async(ms: number) => await new Promise(resolve => setTimeout(resolve, ms))

  const canvasE: any = document.getElementById("canvas")
  const ctx: CanvasRenderingContext2D = canvasE.getContext("2d")
  const textareaE = <HTMLInputElement>document.getElementById("log")
  const graphE: any = document.getElementById('graph')
  const graphctx: CanvasRenderingContext2D = graphE.getContext('2d');
  const graph = new Chart(graphctx)
  const log = (x: string, obj: any = null) => {
    if(obj !== null) {
      textareaE.value += x + JSON.stringify(obj) + '\n' 
    }else {
      textareaE.value += x + '\n' 
    }
    textareaE.scrollTop = textareaE.scrollHeight
  }

  const FPS = 30
  const option = {
    width: 800,
    height: 600
  }
  
  const env = {
    food: {
      num: 500,
      size: 5
    },
    bacteria: {
      r: 0,
      num: 20,
      size: 15,
      speed: 5
    },
    generation: 50,
    step: 1000,
    mutations: 0.15,
    slowmode: 1 // 0, 1, 2
  }

  /* add simulator */
  const simulator = new Simulator(ctx, option.width, option.height)
  
  /* first add bacteria */
  for(let i=0;i<env.bacteria.num;i++) {
    let width = env.bacteria.size
    let height = env.bacteria.size
    let x = Util.random(0, option.width - width)
    let y = Util.random(0, option.height - height)
    // let x = option.width/2 - env.bacteria.size/2
    // let y = option.height/2 - env.bacteria.size/2

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
    if(env.slowmode == 0) {
      simulator.simulate(env.step)
    }
    else if(env.slowmode == 1) {
      simulator.simulate(env.step)
      simulator.draw()
      await sleep(500)
    }
    else if(env.slowmode == 2) {
      await simulator.test(env.step, FPS)
    }
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
    /* graph */
    const avg = totalScore / env.bacteria.num
    const top = top5score
    graph.append(g.toString(), avg, top)

    log('** generation top 5 score : ', top5score)
    log('** best gene : ', sortByScore[0].gene.chromosome)
    /* escape loop */
    if(totalScore >= 550) {
      break
    }
    /* selection */
    let pairs = Selection.rouletteWheelSelection(<Array<Bacteria>>simulator.components['Bacteria'], env.bacteria.num).slice(0, env.bacteria.num - env.bacteria.r)
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
      log('** mutation '+m +'/'+(env.bacteria.num - env.bacteria.r))
    }
    for(let i=0;i<env.bacteria.r;i++) {
      let width = env.bacteria.size
      let height = env.bacteria.size
      let x = Util.random(0, option.width - width)
      let y = Util.random(0, option.height - height)
      // let x = option.width/2 - env.bacteria.size/2
      // let y = option.height/2 - env.bacteria.size/2
  
      let bacteria = new Bacteria(ctx, simulator, env.bacteria.speed, x, y, width, height, 2, "#FBCEB1")
      bacteria.gene.initRandom()
      simulator.add('Bacteria', bacteria)
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
    // let x = option.width/2 - env.bacteria.size/2
    // let y = option.height/2 - env.bacteria.size/2

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
  await sleep(2000)
  log('** test')
  await simulator.test(env.step, FPS)

  log('** record')
  simulator.clear()
  await simulator.play('name', FPS)
})