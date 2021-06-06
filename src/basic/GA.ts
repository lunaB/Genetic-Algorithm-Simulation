import { Component } from "@/Basic/Component"

export default {
  /* Util */
  evaluationSort(components: Array<Component>) {
    let evaluation = components.sort((a, b) => {
      return b.evaluation() - a.evaluation()
    })
    return evaluation
  },
  /* Selection */
  /* Roulette Wheel */
  rouletteWheelSelection(components: Array<Component>, sample: number) {
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

    let selectList = []

    for(let i=0;i<sample;i++) {
      let componentA = select()
      let componentB = select()

      selectList.push([componentA, componentB])
    }

    return selectList
  }
}