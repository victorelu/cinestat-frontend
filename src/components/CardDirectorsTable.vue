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
            <th>Director</th>
            <th>Titles</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(director, index) in directors" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ director[0] }}</td>
            <td>{{ director[1] }}</td>
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
    directors: {
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
