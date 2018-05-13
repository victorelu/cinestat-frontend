<template>
  <div id="app">
    <div class="loading" v-if="loading">Loading&#8230;</div>
    <nav class="navbar">
      <div class="container">
        <div class="col-sm-6">
          <a class="navbar-brand" href="#">
            cinestat
          </a>
        </div>
        <div class="col-sm-6 btn-info-wrap">
          <button class="btn btn-light btn-sm" v-if="movies.length > 0 && !personName" @click="viewShare = !viewShare">
            Share Your Stats
          </button>
          <button class="btn btn-light btn-sm" v-if="movies.length > 0" @click="viewInfo = !viewInfo">
            <span v-if="viewInfo">Hide Info</span>
            <span v-else>Show Info</span>
          </button>
          <div class="upload-btn-wrapper">
            <button class="btn">Upload ratings file</button>
            <input type="file" class="form-control-file" id="csvFile" @change="handleFileChange">
          </div>
        </div>
      </div>
    </nav>
    <Share v-if="viewShare" />
    <Info v-if="viewInfo" />
    <section class="movies-data" v-if="movies.length !== 0">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <h1 v-if="personName">{{ personName }}'s cinestats</h1>
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
import axios from 'axios'
import Papa from 'papaparse'
import { mapGetters } from 'vuex'

import Share from '@/components/Share'
import Info from '@/components/Info'

export default {
  name: 'App',
  components: {
    Info,
    Share
  },
  data () {
    return {
      viewInfo: true,
      viewShare: false
    }
  },
  computed: {
    ...mapGetters(['movies', 'personName', 'loading'])
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
            this.$store.commit('setPersonName', null)
            this.viewInfo = false
          }.bind(this)
        })
      }
    }
  },
  mounted () {
    // If you got here via a shared stat
    if (this.$route.params.id) {
      this.$store.commit('setLoading', true)
      axios.get(process.env.BACKEND_URL + 'stats/' + this.$route.params.id)
        .then((res) => {
          if (res.status === 200 && typeof res.data.name === 'string' && typeof res.data.movies === 'object') {
            this.$store.commit('setMovies', res.data.movies)
            this.$store.commit('setPersonName', res.data.name ? res.data.name : 'User')
            this.$store.dispatch('calculateRatingDifferences')
            this.$store.dispatch('aggregate')
            this.viewInfo = false
            this.$router.push({ name: 'Summary' })
            this.$store.commit('setLoading', false)
          }
        })
        .catch((err) => {
          console.log(err.toString())
          this.$store.commit('setLoading', false)
        })
    }
  }
}
</script>

<style lang="scss">
@import "./assets/style.scss"
</style>
