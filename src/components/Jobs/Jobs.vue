<template>
<v-container>
  <v-layout row wrap v-if="loading">
    <v-flex xs12 class="text-xs-center">
      <v-progress-circular
        indeterminate
        class="primary--text"
        :width="7"
        :size="70"
        ></v-progress-circular>
    </v-flex>
  </v-layout>
  <v-layout row wrap v-for="job in jobs" :key="job.id" class="mb-2">
    <v-flex xs12 sm10 md8  offset-sm1 offset-md2>
      <v-card class="blue-grey lighten-2" >
        <v-container fluid>
          <v-layout row>
            <v-flex xs5 sm4 md3>
              <v-card-media
              :src='job.imageUrl'
              height="130px"
              >

              </v-card-media>
            </v-flex>
            <v-flex xs7 sm8 md9>
              <v-card-title primary-title>
                <div>
                  <h5 class="white--text mb-0">{{ job.title }}</h5>
                  <div>{{ job.date | date }}</div>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat :to="'/job/' + job.id">
                  <v-icon left light>arrow_forward</v-icon>
                  Afficher Job
                </v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>
<script>
  export default {
    computed: {
      jobs () {
        return this.$store.getters.loadedJobs
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>
