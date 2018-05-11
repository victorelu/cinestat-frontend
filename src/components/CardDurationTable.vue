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
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(movie, index) in movies" :key="index">
            <td>{{ index+1 }}</td>
            <td>{{ movie['Title'] }}</td>
            <td>{{ movie['Runtime (mins)'] | hours }}</td>
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
  props: {
    header: {
      type: String,
      required: true
    },
    movies: {
      type: Array,
      required: true
    }
  },
  filters: {
    hours (value) {
      return Math.floor(value / 60) + 'h ' + value % 60 + 'm'
    }
  }
}
</script>
