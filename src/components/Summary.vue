<template>
  <div class="summary">

    <!-- Rating averages -->
    <div class="row">
      <div class="col-sm-4">
        <CardNumber
          header="Your Average Rating"
          :number="this.aggregated.averageUserRating"
        />
      </div>
      <div class="col-sm-4">
        <CardNumber
          header="Average IMDb Rating"
          :number="this.aggregated.averageImdbRating"
        />
      </div>
      <div class="col-sm-4">
        <CardNumber
          header="Average Rating Difference"
          :number="this.aggregated.averageRatingDifference"
        />
      </div>
    </div>

    <div class="row">

      <!-- Most over-rated -->
      <div class="col-sm-6">
        <CardRatingsTable
          header="Top 10 movies you found over-rated"
          :movies="moviesOverrated"
        />
      </div>

      <!-- Most under-rated -->
      <div class="col-sm-6">
        <CardRatingsTable
          header="Top 10 movies you found under-rated"
          :movies="moviesUnderrated"
        />
      </div>

    </div>
  </div>
</template>

<script>
import { take, takeRight, orderBy } from 'lodash'
import Card from '@/components/Card'
import CardNumber from '@/components/CardNumber'
import CardRatingsTable from '@/components/CardRatingsTable'
export default {
  components: {
    Card,
    CardNumber,
    CardRatingsTable
  },
  computed: {
    aggregated () {
      return this.$store.getters.aggregated
    },
    moviesByDifference () {
      return orderBy(this.$store.getters.movies, [function (m) {
        return parseFloat(m['Rating Difference'])
      }], ['asc'])
    },
    moviesOverrated () {
      return take(this.moviesByDifference, 10)
    },
    moviesUnderrated () {
      return takeRight(this.moviesByDifference, 10).reverse()
    }
  }
}
</script>

<style lang="scss">
.summary {
  padding: 10px;
  h2 {
    text-align: center;
    font-size: 3rem;
  }
  .card {
    margin-bottom: 10px;
  }
  .table {
    margin-bottom: 0;
    th, td {
      font-size: 13px;
      padding: 5px;
      &.center {
        text-align: center;
      }
    }
  }
}
</style>
