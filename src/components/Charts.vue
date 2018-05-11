<template>
  <div class="container">
    <div class="row info-group">
      <div class="col-sm-4 single-number">
        <p>
          Your Average Rating:<br/>
          <strong>{{ this.aggregated.averageUserRating }}</strong>
        </p>
      </div>
      <div class="col-sm-4 single-number">
        <p>
          Average IMDb Rating:<br/>
          <strong>{{ this.aggregated.averageImdbRating }}</strong>
        </p>
      </div>
      <div class="col-sm-4 single-number">
        <p>
          Average Rating Difference:<br/>
          <strong>{{ this.aggregated.averageRatingDifference }}</strong>
        </p>
      </div>
    </div>
    <div class="row info-group">
      <div class="col-sm-12">
        <h2>Year of release</h2>
        <p>A rundown by <strong>year</strong> of the movies you watched.</p>
        <Chart
          :source="this.aggregated.years.release"
          label="Released"
          type="bar"
        />
      </div>
    </div>
    <div class="row info-group">
      <div class="col-sm-6">
        <h2>Year Rated</h2>
        <p>A rundown by <strong>year</strong> of the ratings you gave for movies you watched.</p>
        <Chart
          :source="this.aggregated.years.rated"
          label="Rated"
          type="line"
        />
      </div>
      <div class="col-sm-6">
        <h2>Month Rated</h2>
        <p>A rundown by <strong>month</strong> of the ratings you gave for movies you watched. If you rated movies soon after watching them, this chart should be an accurate representation of when you watched them.</p>
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
        <p>A rundown of the average rating you gave to the movies you watched.</p>
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
  </div>
</template>

<script>
import Chart from '@/components/Chart'

export default {
  components: {
    Chart
  },
  data () {
    return {
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

<style>
.info-group {
  margin-bottom: 20px;
  padding-top: 20px;
}
.single-number {
  text-align: center;
}
</style>
