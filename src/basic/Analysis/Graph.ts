import Chart from 'chart.js/auto';

export default class Graph {
  chart: Chart
  labels: Array<string> = []
  data: Array<number> = []

  backgroundColor: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
  ]
  borderColor: [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ]
  constructor(ctx: CanvasRenderingContext2D) {
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Total Evalueation',
          data: this.data,
          backgroundColor: this.backgroundColor,
          borderColor: this.borderColor,
          borderWidth: 1
        }]
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

  append(label: string, data: number) {
    this.labels.push(label)
    this.data.push(data)
    this.chart.update()
  }
}