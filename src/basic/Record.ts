import { Component } from "./Components/Component";
import { Simulator, Scene } from "./Simulator";
import * as _ from 'lodash'

type Moment = {
  components: string // JSON.stringify (Scene)
  variables: string // JSON.stringify (any)
}

type MomentRaw = {
  components: Scene
  variables: object
}

type Tapes = {
  [name: string] : {
    moments: Array<MomentRaw>,
    description: string
  }
}

export default class Record {

  tapes: Tapes
  static tapeCnt: number = 0
  
  constructor() {
    this.tapes = {}
  }

  addTape(name: string = '', description: string = '') {
    if(name in this.tapes) throw new Error('duplicate tape name')
    if(name == '') {
      Record.tapeCnt += 1
      name = Record.tapeCnt.toString()
    }
    this.tapes[name] = {
      moments: [],
      description: description
    }
  }

  record(components: Scene, variables: object = {}) {
    this.tapes[Record.tapeCnt].moments.push({
      // components: _.cloneDeep(components),
      // variables: _.cloneDeep(variables)
      components,
      variables
    })
  }
  
  // getTape(name: string) {
  //   console.log(this.tapes[name].moments.map(x=> JSON.parse(x.components)))
  //   let res: { moments: MomentRaw, } = {
  //     moments: {
  //       components: this.tapes[name].moments.map(x=> JSON.parse(x.components)),
  //       variables: this.tapes[name].moments.map(x => JSON.parse(x.variables)),
  //     },
  //     description: ''
  //   }
  //   return res
  // }
}