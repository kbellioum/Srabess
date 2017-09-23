<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm4 class="text-xs-center text-sm-right">
        <v-btn large router to="/jobs" class="info">Explore JOBS</v-btn>
      </v-flex>
      <v-flex xs12 sm4 class="text-xs-center">
        <v-btn large router to="/job/new" class="info">Organize JOBS</v-btn>
      </v-flex>
      <v-flex xs12 sm4 class="text-xs-center text-sm-left">
        <v-btn large router to="/employers" class="info">Explore EMPLOYERS</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loading"
          ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2" v-if="!loading">
      <v-flex xs12>
        <v-carousel style="cursor: pointer;">
          <v-carousel-item
            v-for="job in jobs"
            :src="job.imageUrl"
            :key="job.id"
            @click="onLoadJob(job.id)">
            <div class="title">

            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap  class="mt-2">
      <v-flex xs12 class="text-xs-center">
       <p>Take a look to all JOBS</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    computed: {
      jobs () {
        return this.$store.getters.featuredJobs
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadJob (id) {
        this.$router.push('/job/' + id)
      }
    }
  }
</script>
