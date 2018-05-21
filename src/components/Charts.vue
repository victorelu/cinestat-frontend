<template>
  <div class="container">
    <div class="row info-group">
      <div class="col-sm-12">
        <h2>Year of release</h2>
        <p>A rundown by <strong>year</strong> of the movies watched.</p>
        <Chart
          :source="this.aggregated.years.release"
          label="Released"
          type="bar"
        />
      </div>
    </div>
    <div class="row info-group">
      <div class="col-sm-6">
        <h2>Ratings by Year</h2>
        <p>A rundown by <strong>year</strong> of the ratings given for movies watched.</p>
        <Chart
          :source="this.aggregated.years.rated"
          label="Rated"
          type="line"
        />
      </div>
      <div class="col-sm-6">
        <h2>Ratings by Month</h2>
        <p>A rundown by <strong>month</strong> of the ratings given for movies watched. If movies were rated soon after watching them, this chart should be a fairly accurate representation.</p>
        <Chart
          :source="this.aggregated.months.rated"
          :datasetLabels="months"
          label="Rated"
          type="bar"
        />
      </div>
    </div>
    <div class="row info-group">
      <div class="col-sm-12">
        <h2>How you rated</h2>
        <p>A rundown of the average rating given to the watched movies.</p>
        <Chart
          :source="this.aggregated.userRatings"
          label="Rated"
          type="bar"
        />
      </div>
    </div>
    <div class="row info-group">
      <div class="col-sm-12">
        <h2>Genres</h2>
        <p>Movies are often classified as more than one genre, which means the sum of the data in the following chart will always be greater than the total number of movies in the data source.</p>
        <Chart
          :source="this.aggregated.genres"
          :showLegend="true"
          label="Type"
          type="horizontalBar"
        />
      </div>
    </div>
    <div class="row info-group">
      <div class="col-sm-12">
        <h2>Duration</h2>
        <p>See if there's a trend between the duration of your movie, your will to watch and your rating after watching it.</p>
        <Chart
          :datasetLabels="byDuration.datasetLabels"
          :options="byDuration.options"
          :datasets="byDuration.datasets"
          label="By Duration"
          type="bar"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getRandomColor } from '@/helpers'
import Chart from '@/components/Chart'

export default {
  components: {
    Chart
  },
  data () {
    let datasetLabels = []
    let datasets = [{
      label: 'Number of',
      yAxisID: 'left-y-axis',
      data: [],
      backgroundColor: getRandomColor(0.5)
    }, {
      label: 'Average Rating',
      yAxisID: 'right-y-axis',
      data: [],
      borderColor: getRandomColor(0.5),
      backgroundColor: 'transparent',
      type: 'line'
    }]

    for (let minutes in this.$store.getters.aggregated.byDuration) {
      datasetLabels.push(minutes * 10 + ' - ' + minutes + 9 + ' minutes')
      datasets[0].data.push(this.$store.getters.aggregated.byDuration[minutes]['numberOf'])
      datasets[1].data.push(this.$store.getters.aggregated.byDuration[minutes]['average'])
    }

    let options = {
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          id: 'left-y-axis',
          type: 'linear',
          position: 'left'
        }, {
          id: 'right-y-axis',
          type: 'linear',
          position: 'right',
          ticks: {
            min: 1,
            max: 10
          }
        }]
      }
    }
    return {
      byDuration: {
        datasetLabels,
        datasets,
        options
      },
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
      ]
    }
  },
  computed: {
    aggregated () {
      return this.$store.getters.aggregated
    }
  }
}
</script>
