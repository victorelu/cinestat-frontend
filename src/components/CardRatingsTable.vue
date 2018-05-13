<template>
  <Card>
    <template slot="header">
      {{ header }}
    </template>
    <template slot="body">
      <table class="table table-striped table-condensed table-hover">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th class="center">IMDb</th>
            <th class="center">{{ name }}</th>
            <th class="center">Difference</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(movie, index) in movies" :key="index">
            <td class="center">{{ index+1 }}</td>
            <td>{{ movie['Title'] }}</td>
            <td class="center">{{ movie['IMDb Rating'].toFixed(1) }}</td>
            <td class="center">{{ movie['Your Rating'] }}</td>
            <td class="center">{{ movie['Rating Difference'] }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </Card>
</template>
<script>
import Card from './Card'
export default {
  components: {
    Card
  },
  computed: {
    name () {
      return this.$store.getters.personName ? this.$store.getters.personName : 'You'
    }
  },
  props: {
    header: {
      type: String,
      required: true
    },
    movies: {
      type: Array,
      required: true
    }
  }
}
</script>
