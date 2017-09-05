<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/jobs" class="info">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/job/new" class="info">Organize Meetup</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
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
       <p>Join our awesome meetups!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    computed: {
      jobs () {
        return this.$store.getters.featuredJobs
      }
    },
    methods: {
      onLoadJob (id) {
        this.$router.push('/job/' + id)
      }
    }
  }
</script>
