<template>
  <div class="chart-wrapper">
    <canvas ref="chart-element" height="400" width="400"></canvas>
  </div>
</template>

<script>
import ChartJs from 'chart.js'
import { getRandomColor } from '@/helpers'
export default {
  name: 'Chart',
  props: {
    source: {
      required: true,
      type: Object
    },
    label: {
      require: true,
      type: String
    },
    type: {
      required: true,
      type: String
    },
    datasetLabels: {
      required: false,
      default: null,
      type: Array
    },
    showLegend: {
      required: false,
      default: false,
      type: Boolean
    }
  },
  mounted () {
    let ctx = this.$refs['chart-element']
    /* eslint-disable no-new */
    new ChartJs(ctx, {
      type: this.type,
      data: {
        labels: this.datasetLabels ? this.datasetLabels : Object.keys(this.source),
        datasets: [
          {
            label: this.label,
            data: Object.values(this.source),
            lineTension: 0,
            backgroundColor: Object.keys(this.source).map((item) => {
              return getRandomColor(0.5)
            })
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: this.showLegend
        }
      }
    })
  }
}
</script>

<style scoped>
.chart-wrapper {
  max-height: 400px;
}
</style>
