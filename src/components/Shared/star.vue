<template lang="html">
  <div>
      <span v-for="i in 5" :key="i">
        <v-icon class="blue--text" v-if="isOk(i)">star</v-icon>
        <v-icon v-else>star</v-icon>
      </span>
  </div>
</template>

<script>
export default {
  props: ['rate'],
  methods: {
    isOk (i) {
      return i <= this.rate
    }
  }
}
</script>



<style lang="css">
</style>
