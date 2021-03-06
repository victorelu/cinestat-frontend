<template>
  <div>
    <div class="filters">
      <div class="btn-group btn-group-sm" role="group" aria-label="Genres" v-for="(genre, index) in genres.sort()" :key="index">
        <button
          type="button"
          :class="`btn btn-outline-secondary ${isFilterOn('genres', genre) ? 'active' : ''}`"
          @click="toggleFilter('genres', genre)"
        >
          {{ genre }}
        </button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-sm table-striped table-hover table-list">
        <thead>
          <tr v-for="(row, rowIndex) in header" :key="rowIndex">
            <th
              v-for="(cell, cellIndex) in row"
              :key="cellIndex"
              :rowspan="cell.rowspan"
              :colspan="cell.colspan"
              :class="cell.class"
              @click="cell.sortBy ? setSortBy(cell.sortBy) : () => { }"
            >
              {{ cell.label }}
              <span v-if="cell.sortBy === sort.by">
                <span v-if="sort.direction === 'asc'">&#8593;</span>
                <span v-else>&#8595;</span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in sortedMovies" :key="movie.Const">
            <td>
              <a :href="'https://www.imdb.com/title/' + movie.Const" target="_blank">
                {{ movie['Title'] }}
              </a>
            </td>
            <td>{{ movie['Release Date'] }}</td>
            <td>{{ movie['Date Rated'] }}</td>
            <td>{{ movie['Runtime (mins)'] }}</td>
            <td>{{ movie['Genres'].join(', ') }}</td>
            <td class="center fixed-width">{{ movie['Your Rating'] }}</td>
            <td class="center fixed-width">{{ movie['IMDb Rating'] }}</td>
            <td class="center fixed-width">{{ movie['Rating Difference'] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { intersection, orderBy } from 'lodash'
export default {
  name: 'List',
  data () {
    return {
      header: [
        [
          { label: 'Title', rowspan: 2, sortBy: 'Title' },
          { label: 'Released', rowspan: 2, class: 'date', sortBy: 'Release Date' },
          { label: 'Rated', rowspan: 2, class: 'date', sortBy: 'Date Rated' },
          { label: 'Runtime', rowspan: 2, sortBy: 'Runtime (mins)' },
          { label: 'Genres', rowspan: 2 },
          { label: 'Ratings', colspan: 3, sort: false, class: 'rating' }
        ],
        [
          { label: this.$store.getters.personName ? this.$store.getters.personName : 'You', sortBy: 'Your Rating', class: 'rating' },
          { label: 'IMDb', sortBy: 'IMDb Rating', class: 'rating' },
          { label: 'Difference', sortBy: 'Rating Difference', class: 'rating' }
        ]
      ],
      filters: {
        genres: [],
        yearsReleased: [],
        yearsRated: []
      },
      sort: {
        by: 'Title',
        direction: 'asc'
      }
    }
  },
  computed: {
    movies () {
      return this.$store.getters.movies
    },
    genres () {
      return this.$store.getters.genres
    },
    filteredMovies () {
      return this.movies
        .filter((movie) => {
          if (this.filters.genres.length > 0) {
            return intersection(movie['Genres'], this.filters.genres).length > 0
          }
          return true
        })
    },
    sortedMovies () {
      return orderBy(this.filteredMovies, [function (m) {
        return ['Your Rating', 'IMDb Rating', 'Rating Difference', 'Runtime (mins)'].indexOf(this.sort.by) === -1
          ? m[this.sort.by]
          : parseFloat(m[this.sort.by])
      }.bind(this)], [this.sort.direction])
    }
  },
  methods: {
    toggleFilter (filter, value) {
      let index = this.filters[filter].indexOf(value)
      if (index === -1) {
        this.filters[filter].push(value)
      } else {
        this.filters[filter].splice(index, 1)
      }
    },
    isFilterOn (filter, value) {
      return this.filters[filter].indexOf(value) !== -1
    },
    setSortBy (by) {
      if (by === this.sort.by) {
        this.sort.direction = this.sort.direction === 'asc' ? 'desc' : 'asc'
      } else {
        this.sort.by = by
        this.sort.direction = 'asc'
      }
    }
  }
}
</script>

<style scoped>
.btn-group {
  margin-right: 5px;
  margin-bottom: 5px;
}
.filters {
  padding: 10px;
}
.fixed-width {
  width: 85px;
}
</style>
