<template>
  <Card>
    <template slot="header">
      {{ header }}
    </template>
    <template slot="body">
      <h2 class="card-title">
        {{ number }}
      </h2>
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
    number: {
      required: true
    }
  }
}
</script>
