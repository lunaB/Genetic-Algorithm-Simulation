import Chart from 'chart.js/auto';

export default class Graph {
  chart: Chart
  labels: Array<string> = []
  bar: Array<number> = []
  line: Array<any> = []

  backgroundColor: Array<string> =  [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
  ]
  borderColor: Array<string> = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ]

  constructor(ctx: CanvasRenderingContext2D) {
    for(let i=0;i<5;i++) {
      this.line.push({
        type: 'line',
        label: 'top score - '+(i+1),
        data: [],
        backgroundColor: this.backgroundColor,
        borderColor: this.borderColor,
        borderWidth: 1
      })
    }

    this.chart = new Chart(ctx, {
      data: {
        labels: this.labels,
        datasets: [{
          type: 'bar',
          label: 'Average Evalueation',
          data: this.bar,
          backgroundColor: this.backgroundColor,
          borderColor: this.borderColor,
          borderWidth: 1
        }, ...this.line]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }

  append(label: string, bar: number, line: Array<number>) {
    this.labels.push(label)
    this.bar.push(bar)
    for(let i=0;i<this.line.length;i++) {
      this.line[i].data.push(line[i])
    }
    this.chart.update()
  }
}