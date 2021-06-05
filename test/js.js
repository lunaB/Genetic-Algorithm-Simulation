class Gene {
    constructor() {
        // menual
        this.chromosome_size = 30
        this.chromosome_base = ['A','G','C','T']
        
        // init
        this.chromosome = []
        
        // system
        this.move_system = []
    }

    // set chromosome
    setChromosome(chromosome) {
        this.chromosome = chromosome
        this.systemInit()
    }
    
    // chromosome random init
    generateChromosome() {
        for(var i=0;i<this.chromosome_size;i++) {
            var base = Math.floor(Math.random()*this.chromosome_base.length)
            this.chromosome.push(this.chromosome_base[base])
        }
        this.systemInit()
    }
    
    // system init
    systemInit() {
        var start = false
        var ms_tmp = []
        for(var i=2;i<this.chromosome.length;i++) {
            // push
            if(start) {
                ms_tmp.push(this.chromosome[i])
            }
            // movement system start
            else if(
                this.chromosome[i-2] == 'A' && 
                this.chromosome[i-1] == 'G' &&
                this.chromosome[i] == 'C') {
                
                start = true
            }
        }
        // 짝안맞는거 처리
        if(ms_tmp.length % 2 != 0) {
            ms_tmp.pop()
        }
        // pair set
        while(ms_tmp.length) {
            var sp = ms_tmp.splice(0,2)
            if(sp[0] == 'A') sp[0] = 0
            else if(sp[0] == 'G') sp[0] = 90
            else if(sp[0] == 'C') sp[0] = 180
            else if(sp[0] == 'T') sp[0] = 270
            
            if(sp[1] == 'A') sp[1] = 1
            else if(sp[1] == 'G') sp[1] = 0.9
            else if(sp[1] == 'C') sp[1] = 0.8
            else if(sp[1] == 'T') sp[1] = 0.7
            
            this.move_system.push(sp);   
        }
    }
}

class Unit {

    static generateUID = 0

    constructor(ctx, x, y, height, width, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = color;

        this.UID = Unit.generateUID
        Unit.generateUID += 1

        // init
        this.draw(this.x, this.y, this.width, this.height)
    }
    
    draw(x,y,w,h) {
        this.ctx.save()
        this.ctx.translate(x, y);
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(0, 0, w, h);
        this.ctx.restore();
    }
    
    move(direction, distence) {
        this.x += distence * Math.cos(direction)
        this.y += distence * Math.sin(direction)
    }
    
    evaluation() {}

    step() {}

    clear() {}
    
    update() {
        this.step()
        this.draw(this.x, this.y, this.width, this.height)
    }
}


class Bacteria extends Unit {
    constructor(ctx, simulator, speed,/*#*/ x, y, height, width, color='#FBCEB1') {
        super(ctx, x, y, height, width, color)
        this.simulator = simulator
        this.speed = speed
        
        this.gene = new Gene()
        
        // gene coding
        this.move_iter = 0
        // etc
        this.fullness = 0
    }

    // override
    evaluation() {
        var res = this.fullness
        return res
    }
    
    // override
    step() {
        // move system
        if(this.gene.move_system.length) {
            if(this.move_iter == this.gene.move_system.length) {
                this.move_iter = 0
            }

            var ms = this.gene.move_system[this.move_iter]
            var direction = ms[0]
            var speed_rate = ms[1]

            super.move(direction, this.speed * speed_rate)

            this.move_iter += 1
        }
        
        // phagocytosis
        // 한 step에 한개만 먹을 수 있슴
        if('Food' in this.simulator.components) {
            for(var i=0;i<this.simulator.components['Food'].length;i++) {
                var food = this.simulator.components['Food'][i]
                if(this.x < food.x + food.width && 
                   this.x + this.width > food.x &&
                   this.y < food.y + food.height &&
                   this.y + this.height > food.y) {
                    
                    this.fullness += 1
                    this.simulator.components['Food'].splice(i, 1)
                    break
                }
            }
        }
    }

    // override
    clear() {
        this.fullness = 0
    }
}

class Food extends Unit {
    constructor(ctx,/*#*/ x, y, height, width, color='#964B00') {
        super(ctx, x, y, height, width, color)
    }
    
    // override
    step() {}
}

class Util {
    static unitDistence(unitA, unitB) {
        return Math.sqrt(Math.pow(unitA.x - unitB.x, 2) + Math.pow(unitA.y - unitB.y, 2))
    }
}

class GA {
    static rouletteWheelSelection() {
        
    }
}

class Simulator {
    constructor(ctx, {width, height}) {
        this.ctx = ctx
        this.width = width
        this.height = height

        this.setComponents()
    }

    setComponents(components = {}) {
        this.components = components
    }
    
    add(name, component) {
        if(!(name in this.components)) {
            this.components[name] = []
        }
        this.components[name].push(component)
    }

    update() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        for(var k in this.components){
            for(var i=0;i<this.components[k].length;i++) {
                var component = this.components[k][i]
                component.update() 
            }
        }
    }
    
    async test(step_cnt = 1000, FPS) {
        var step = 0;
        return await new Promise((resolve, reject) => {
            var interval = setInterval(() => {
                this.update()
                step += 1
                if(step > step_cnt) {
                    clearInterval(interval)
                    resolve()
                }
            }, 1000 / FPS)
        })
    }
    
    simulate(step_cnt = 1000) {
        for(var i=0;i<step_cnt;i++) {
            this.update()
        }
    }

    clear() {
        this.components = {}
    }
    
}

document.addEventListener("DOMContentLoaded", async() => {
    
    var canvas = document.getElementById("canvas")
    var ctx = canvas.getContext("2d")
    var FPS = 60
    var width = 800
    var height = 600

    var simulator = new Simulator(ctx, {width, height})

    /* # Main # */

    // add component
    // food
    for(var i=0;i<300; i++) {
        var f_width = Math.random() * 3 + 3
        var f_height = Math.random() * 3 + 3
        var f_x = Math.random() * (width - f_width)
        var f_y = Math.random() * (height - f_height)
        simulator.add('Food', new Food(ctx,/*#*/ f_x, f_y, f_width, f_height))
    }
    // bacteria
    for(var i=0;i<30;i++) {
        var b_width = 10
        var b_height = 10
        var b_x = Math.random() * (width - b_width)
        var b_y = Math.random() * (height - b_width)
        var bacteria = new Bacteria(ctx, simulator, 1,/*#*/ b_x, b_y, b_width, b_height)
        bacteria.gene.generateChromosome()
        simulator.add('Bacteria', bacteria)
    }

    // generation
    for(var g=0;g<10;g++) {
        await simulator.test(500, FPS)
        // simulator.simulate(1000)

        // ( * 일단 복잡도 생각안하고 만들기 * )
        // 룰렛휠 
        // evaluation sort
        var evaluation = simulator.components['Bacteria'].sort((a, b) => {
            return b.evaluation() - a.evaluation()
        })
        var S = evaluation.reduce((sum, v) => sum + v.evaluation(), 0)
        
        console.log('=== generation ['+(g+1)+'] score ['+S+'] ===')
        console.log('best gene : '+evaluation[0].gene.chromosome)

        var select = () => {
            var r = Math.random() * S
            var s = 0
            var i = 0
            for(i=0;i<evaluation.length;i++) {
                s += evaluation[i].evaluation()
                if(r < s) {
                    return evaluation[i]
                }
            }
        }

        var newSimulator = new Simulator(ctx, {width, height})

        for(var i=0;i<300; i++) {
            var f_width = Math.random() * 3 + 3
            var f_height = Math.random() * 3 + 3
            var f_x = Math.random() * (width - f_width)
            var f_y = Math.random() * (height - f_height)
            newSimulator.add('Food', new Food(ctx,/*#*/ f_x, f_y, f_width, f_height))
        }

        // 기존거
        for(var i=0;i<30;i++) {
            var b_width = 10
            var b_height = 10
            var b_x = Math.random() * (width - b_width)
            var b_y = Math.random() * (height - b_width)
            
            var bacteriaA = select()
            var bacteriaB = select()

            var a = bacteriaA.gene.chromosome;
            var b = bacteriaB.gene.chromosome;

            var r = Math.floor(Math.random() * a.length)
            var newChromosome = a.slice(0, r).concat(b.slice(r, r.length))
            var newBacteria = new Bacteria(ctx, newSimulator, 1,/*#*/ b_x, b_y, b_width, b_height)
            newBacteria.gene.setChromosome(newChromosome)
            newSimulator.add('Bacteria', newBacteria)
        }

        simulator = newSimulator
    }

    await simulator.test(1000, FPS)
    console.log('Done')
})




