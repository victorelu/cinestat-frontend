<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light">
      <div class="container">
        <div class="col-sm-12">
          <a class="navbar-brand" href="#">
            Movie Ratings analysis
          </a>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="col-sm-12">
        <form>
          <div class="form-group file-upload">
            <label for="csvFile">Upload file (.csv)</label>
            <input type="file" class="form-control-file" id="csvFile" @change="handleFileChange">
          </div>
        </form>
      </div>
      <div class="col-sm-12" v-if="movies.length !== 0">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'List' }">
              List
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Charts' }">
              Charts
            </router-link>
          </li>
        </ul>
        <div class="tab-content">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Papa from 'papaparse'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['movies'])
  },
  methods: {
    handleFileChange (event) {
      let file = event.target.files[0]
      if (file !== undefined) {
        Papa.parse(file, {
          header: true,
          encoding: 'UTF-8',
          complete: function (results, file) {
            let movies = results.data
            this.$store.commit('setMovies',
              movies
                .filter((movie) => {
                  return movie['Title'] !== undefined
                })
                .map((movie) => {
                  movie['Genres'] = movie['Genres'].split(', ')
                  return movie
                })
            )
            this.$store.dispatch('calculateRatingDifferences')
            this.$store.dispatch('aggregate')
          }.bind(this)
        })
      }
    }
  }
}
</script>

<style>
body {
  padding-bottom: 20px;
}
.file-upload {
  margin-top: 15px;
  margin-bottom: 15px;
}
.nav-tabs {
  margin-top: 20px;
}
.tab-content {
  margin-top: -1px;
  border: 1px solid #ddd;
  border-top: none;
}
</style>
