import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    movies: [],
    genres: [],
    aggregated: {},
    personName: null,
    loading: false
  },
  getters: {
    movies: (state) => {
      return state.movies
    },
    genres: (state) => {
      return Object.keys(state.aggregated.genres)
    },
    aggregated: (state) => {
      return state.aggregated
    },
    personName: (state) => {
      return state.personName
    },
    loading: (state) => {
      return state.loading
    }
  },
  mutations: {
    setMovies (state, payload) {
      state.movies = payload
    },
    setPersonName (state, payload) {
      state.personName = payload
    },
    setAggregated (state, payload) {
      state.aggregated = Object.assign(state.aggregated, payload)
    },
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    calculateRatingDifferences ({ commit, state }) {
      let userRatingTotal = 0
      let imdbRatingTotal = 0
      state.movies = state.movies.map((movie) => {
        movie['Your Rating'] = parseFloat(movie['Your Rating'])
        movie['IMDb Rating'] = parseFloat(movie['IMDb Rating'])
        movie['Rating Difference'] = (movie['Your Rating'] - movie['IMDb Rating']).toFixed(1)
        // Totals for averages
        userRatingTotal += parseFloat(movie['Your Rating'])
        imdbRatingTotal += parseFloat(movie['IMDb Rating'])
        return movie
      })
      state.aggregated.averageUserRating = (userRatingTotal / state.movies.length).toFixed(1)
      state.aggregated.averageImdbRating = (imdbRatingTotal / state.movies.length).toFixed(1)
      state.aggregated.averageRatingDifference = (state.aggregated.averageUserRating - state.aggregated.averageImdbRating).toFixed(1)
    },
    aggregate ({ commit, state }) {
      let years = {
        release: {},
        rated: {}
      }
      let months = {
        rated: {}
      }
      let genres = {}
      let directors = {}
      let userRatings = {}
      let duration = 0

      let byDuration = {}

      for (let movie of state.movies) {
        // Release Stats
        let releaseDate = new Date(movie['Release Date'])
        let releaseYear = releaseDate.getFullYear()
        // This can sometimes be empty
        if (!isNaN(releaseYear)) {
          years.release[releaseYear] = years.release[releaseYear] === undefined ? 1 : years.release[releaseYear] + 1
        }

        // Rating Stats
        let ratedDate = new Date(movie['Date Rated'])
        let ratedMonth = ratedDate.getMonth() + 1
        let ratedYear = ratedDate.getFullYear()
        years.rated[ratedYear] = years.rated[ratedYear] === undefined ? 1 : years.rated[ratedYear] + 1
        months.rated[ratedMonth] = months.rated[ratedMonth] === undefined ? 1 : months.rated[ratedMonth] + 1

        // By Genres
        for (let genre of movie['Genres']) {
          genres[genre] = genres[genre] === undefined ? 1 : genres[genre] + 1
        }

        // By Directors
        for (let director of movie['Directors']) {
          if (director.length !== 0) {
            directors[director] = directors[director] === undefined ? 1 : directors[director] + 1
          }
        }

        // By my ratings
        userRatings[movie['Your Rating']] = userRatings[movie['Your Rating']] === undefined ? 1 : userRatings[movie['Your Rating']] + 1

        // Add its duration to the total duration
        if (!isNaN(parseInt(movie['Runtime (mins)']))) {
          duration += parseInt(movie['Runtime (mins)'])
          let flooredDuration = Math.floor(movie['Runtime (mins)'] / 10)
          if (byDuration[flooredDuration] === undefined) {
            byDuration[flooredDuration] = {
              ratingsSum: movie['Your Rating'],
              numberOf: 1
            }
          } else {
            byDuration[flooredDuration]['ratingsSum'] += movie['Your Rating']
            byDuration[flooredDuration]['numberOf']++
          }
        }
      }

      for (let minutes in byDuration) {
        byDuration[minutes]['average'] = parseFloat((byDuration[minutes]['ratingsSum'] / byDuration[minutes]['numberOf']).toFixed(2))
      }

      commit('setAggregated', {
        years,
        months,
        genres,
        userRatings,
        directors,
        byDuration,
        duration
      })
    }
  }
})
