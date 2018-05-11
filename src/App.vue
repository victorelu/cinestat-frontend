<template>
  <div id="app">
    <nav class="navbar">
      <div class="container">
        <div class="col-sm-10">
          <a class="navbar-brand" href="#">
            Movier
          </a>
        </div>
        <div class="col-sm-2 btn-info-wrap">
          <button class="btn btn-light btn-sm" v-if="movies.length > 0" @click="viewInfo = !viewInfo">
            <span v-if="viewInfo">Hide Info</span>
            <span v-else>Show Info</span>
          </button>
        </div>
      </div>
    </nav>
    <section class="upload" v-if="viewInfo">
      <div class="container">
        <div class="col-xs-12">
          <form>
            <div class="form-group file-upload">
              <div class="upload-btn-wrapper">
                <button class="btn">Upload ratings file</button>
                <input type="file" class="form-control-file" id="csvFile" @change="handleFileChange">
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
    <Info v-if="viewInfo" />
    <section class="movies-data">
      <div class="container">
        <div class="row">
          <div class="col-sm-12" v-if="movies.length !== 0">
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'Summary' }">
                  Summary
                </router-link>
              </li>
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
    </section>
  </div>
</template>

<script>
import Papa from 'papaparse'
import { mapGetters } from 'vuex'

import Info from '@/components/Info'

export default {
  name: 'App',
  components: {
    Info
  },
  data () {
    return {
      viewInfo: true
    }
  },
  computed: {
    ...mapGetters(['movies'])
  },
  methods: {
    handleFileChange (event) {
      let file = event.target.files[0]
      if (file !== undefined) {
        Papa.parse(file, {
          header: true,
          encoding: 'iso-8859-1',
          complete: function (results, file) {
            let movies = results.data
            this.$store.commit('setMovies',
              movies
                .filter((movie) => {
                  return movie['Title'] !== undefined
                })
                .map((movie) => {
                  movie['Genres'] = movie['Genres'].split(', ')
                  movie['Directors'] = movie['Directors'].split(', ')
                  return movie
                })
            )
            this.$store.dispatch('calculateRatingDifferences')
            this.$store.dispatch('aggregate')
            this.viewInfo = false
          }.bind(this)
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import "./assets/style.scss"
</style>
