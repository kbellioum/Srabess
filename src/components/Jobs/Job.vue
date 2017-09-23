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
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ job.title }}</h6 >
              <template v-if="userIsCreator">
                <v-spacer></v-spacer>
                <app-edit-job-details-dialog :job="job"></app-edit-job-details-dialog>
              </template>
          </v-card-title>
          <v-card-media
          :src='job.imageUrl'
          height="400px"

          >

          </v-card-media>
          <v-card-text>
            <div class="info--text">{{ job.date | date }}</div>
            <div>
              <app-edit-job-date-dialog :job="job" v-if="userIsCreator"></app-edit-job-date-dialog>
              <app-edit-job-time-dialog :job="job" v-if="userIsCreator"></app-edit-job-time-dialog>
            </div>
            <div>
              {{ job.description }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-job-register-dialog :jobId="job.id" v-if="userIsAuthenticated && !userIsCreator"></app-job-register-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    props: [
      'id'
    ],
    computed: {
      job () {
        return this.$store.getters.loadedJob(this.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.job.creatorId
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>
