<template>
  <div class="summary">

    <div class="row">
      <div class="col-sm-6">
        <CardNumber
          header="Total Movies Rated"
          :number="this.movies.length"
        />
        <CardNumber
          header="Total Duration"
          :number="this.aggregated.duration | days"
        />
      </div>
      <div class="col-sm-6">
        <Card>
          <template slot="header">
            Your most popular directors
          </template>
          <template slot="body">
            <table class="table table-striped table-hover table-condensed">
              <tbody>
                <tr v-for="(director, index) in moviesByDirector" :key="index">
                  <td>{{ director[0] }}</td>
                  <td>{{ director[1] }} titles</td>
                </tr>
              </tbody>
            </table>
          </template>
        </Card>
      </div>
    </div>

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

    <!-- Most over-rated and under-rated -->
    <div class="row">
      <div class="col-sm-6">
        <CardRatingsTable
          header="Top 10 movies you found over-rated"
          :movies="moviesOverrated"
        />
      </div>
      <div class="col-sm-6">
        <CardRatingsTable
          header="Top 10 movies you found under-rated"
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
        <CardDurationTable
          header="Shortest Movies Watched (excluding 'short' movies)"
          :movies="moviesShortest"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { take, takeRight, orderBy } from 'lodash'
import Card from '@/components/Card'
import CardNumber from '@/components/CardNumber'
import CardDurationTable from '@/components/CardDurationTable'
import CardRatingsTable from '@/components/CardRatingsTable'
export default {
  components: {
    Card,
    CardNumber,
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
      return take(orderBy(Object.entries(this.$store.getters.aggregated.directors), [(d) => d[1]], ['desc']), 8)
    },
    moviesByDuration () {
      return orderBy(this.movies.filter((m) => m['Title Type'] === 'movie'), [function (m) {
        return parseInt(m['Runtime (mins)'])
      }], ['desc'])
    },
    moviesLongest () {
      return take(this.moviesByDuration, 10)
    },
    moviesShortest () {
      return takeRight(this.moviesByDuration.filter((m) => m['Title Type'] !== 'short'), 10).reverse()
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
