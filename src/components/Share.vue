<template>
  <section id="share">
    <div class="container">
      <div class="col-xs-12 col-sm-6 offset-sm-3" v-if="!id">
        <div class="input-group">
          <input type="text" required class="form-control" placeholder="Your First Name" v-model="name" />
          <div class="input-group-append">
            <button class="btn" type="button" @click="getLink()">
              Get link
            </button>
          </div>
          <p>
            By getting a shareable link, you agree with uploading the information about your movie watching statistics to cinestat. This information will be made public at your discretion. No other identifying information other than your first name will be saved.
          </p>
        </div>
      </div>
      <div class="col-xs-12" v-else>
        <p>
          You can share your cinestats with the link below:
        </p>
        <h2>
          {{ shareLink }}
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      name: '',
      id: null
    }
  },
  computed: {
    shareLink () {
      return process.env.FRONTEND_URL + '#/stats/' + this.id
    }
  },
  methods: {
    getLink () {
      this.$store.commit('setLoading', true)
      let movies = this.$store.getters.movies
      axios.post(process.env.BACKEND_URL + 'stats', {
        name: this.name,
        movies: movies
      }).then((res) => {
        this.id = res.data.id
        this.$store.commit('setLoading', false)
      }).catch((err) => {
        console.log(err)
        this.$store.commit('setLoading', false)
      })
    }
  }
}
</script>

<style lang="scss">
  #share {
    padding: 1em 0;
    p {
      margin-top: 10px;
      font-size: 12px;
    }
    input.form-control {
      color: #d10000;
      &:focus {
        box-shadow: none;
        border-color: #d10000;
      }
    }
    .btn {
      background: #d10000;
      color: #fff;
    }
    h2 {
      color: #d10000;
    }
  }
</style>
