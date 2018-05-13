<template>
  <div class="summary">

    <div class="row">
      <div class="col-sm-6">
        <CardNumber
          header="Total Movies Rated"
          :number="this.movies.length"
        />
      </div>
      <div class="col-sm-6">
        <CardNumber
          header="Total Duration"
          :number="this.aggregated.duration | days"
        />
      </div>
    </div>

    <!-- Rating averages -->
    <div class="row">
      <div class="col-sm-4">
        <CardNumber
          :header="`${personName ? personName : 'Your'} Average Rating`"
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

    <!-- Most over-rated and under-rated -->
    <div class="row">
      <div class="col-sm-6">
        <CardRatingsTable
          header="Top 10 movies considered overrated"
          :movies="moviesOverrated"
        />
      </div>
      <div class="col-sm-6">
        <CardRatingsTable
          header="Top 10 movies considered underrated"
          :movies="moviesUnderrated"
        />
      </div>
    </div>

    <!-- Duration -->
    <div class="row">
      <div class="col-sm-6">
        <CardDurationTable
          header="Longest Movies Watched"
          :movies="moviesLongest"
        />
      </div>
      <div class="col-sm-6">
        <CardDirectorsTable
          header="Most Popular Directors"
          :directors="moviesByDirector"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { take, takeRight, orderBy } from 'lodash'
import Card from '@/components/Card'
import CardNumber from '@/components/CardNumber'
import CardDirectorsTable from '@/components/CardDirectorsTable'
import CardDurationTable from '@/components/CardDurationTable'
import CardRatingsTable from '@/components/CardRatingsTable'
export default {
  components: {
    Card,
    CardNumber,
    CardDirectorsTable,
    CardDurationTable,
    CardRatingsTable
  },
  computed: {
    aggregated () {
      return this.$store.getters.aggregated
    },
    movies () {
      return this.$store.getters.movies
    },
    moviesByDirector () {
      return take(orderBy(Object.entries(this.$store.getters.aggregated.directors), [(d) => d[1]], ['desc']), 10)
    },
    moviesByDuration () {
      return orderBy(this.movies.filter((m) => m['Title Type'] === 'movie'), [function (m) {
        return parseInt(m['Runtime (mins)'])
      }], ['desc'])
    },
    moviesLongest () {
      return take(this.moviesByDuration, 10)
    },
    moviesByDifference () {
      return orderBy(this.movies, [function (m) {
        return parseFloat(m['Rating Difference'])
      }], ['asc'])
    },
    moviesOverrated () {
      return take(this.moviesByDifference, 10)
    },
    moviesUnderrated () {
      return takeRight(this.moviesByDifference, 10).reverse()
    },
    personName () {
      return this.$store.getters.personName
    }
  },
  filters: {
    days (value) {
      return Math.floor(value / 60 / 24) + ' days ' + Math.round(value / 60 % 24) + ' hours'
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
