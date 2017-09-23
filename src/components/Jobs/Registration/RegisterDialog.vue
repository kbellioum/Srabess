<template>
  <v-dialog persistent v-model="registerDialog">
    <v-btn primary accent slot="activator">
      {{ userIsRegistred ? 'Unregister' : 'Register' }}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsRegistred">Unregister from Job</v-card-title>
            <v-card-title v-else>Register for Job</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>Some text I can change this later</v-card-text>
            <v-text-field
              name="montant"
              label="Montant"
              id="montant"
              v-model="montant"
              required
              >

            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn class="red--text darken-1" flat @click="registerDialog = false">Cancel</v-btn>
              <v-btn class="green--text darken-1" flat @click="onAgree">Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['jobId'],
    data () {
      return {
        registerDialog: false,
        montant: ''
      }
    },
    computed: {
      userIsRegistred () {
        return this.$store.getters.user.registeredJobs.findIndex(jobId => {
          return jobId === this.jobId
        }) >= 0
      }
    },
    methods: {
      onAgree () {
        if (this.userIsRegistred) {
          this.$store.dispatch('unregisterUserFromJob', this.jobId)
        } else {
          this.$store.dispatch('registerUserForJob', this.jobId)
        }
      }
    }
  }
</script>
