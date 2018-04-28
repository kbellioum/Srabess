<template>
    <v-container>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <h4 class="primary--text">Create a new Employer</h4>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <form @submit.prevent="onCreateEmployer">
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-text-field name="nom" label="Nom" id="nom" v-model="nom" required>

                </v-text-field>

              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-text-field name="prenom" label="Prenom" id="prenom" v-model="prenom" required>

                </v-text-field>

              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <!-- <v-text-field name="harfa" label="Harfa" id="harfa" v-model="harfa" required>

                </v-text-field> -->
                <v-select
                  label="Harfa"
                  v-bind:items="items"
                  v-model="harfa"
                  v-bind:error-messages="['Please select an option']"
                  item-value="text"
                ></v-select>

              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-text-field name="zone" label="Zone" id="zone" v-model="zone" required>

                </v-text-field>

              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-text-field name="mobile" label="Mobile" id="mobile" v-model="mobile" required>

                </v-text-field>

              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-text-field name="email" label="Email" id="email" v-model="email" required>

                </v-text-field>

              </v-flex>
            </v-layout>

            <!-- <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <h4>Pick a date & time</h4>
              </v-flex>
            </v-layout> -->
            <!-- <v-layout row>
              <v-flex xs12 sm6 offset-sm3 class="mb-2">
                <v-date-picker v-model="date">

                </v-date-picker>


              </v-flex>
            </v-layout> -->
            <!-- <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-time-picker v-model="time" format="24hr">
                </v-time-picker>


              </v-flex>
            </v-layout> -->
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
                <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"
                >

              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <img :src="imageUrl" height="150px">
              </v-flex>
            </v-layout>
            <!-- <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-text-field name="description" label="Description" id="description" v-model="description" multi-line required>

                </v-text-field>

              </v-flex>
            </v-layout> -->
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-btn class="primary" :disabled="!formIsValid" type="submit">
                  Create Employer
                </v-btn>
              </v-flex>
            </v-layout>
          </form>
        </v-flex>
      </v-layout>

    </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      date: new Date(),
      imageUrl: '',
      description: '',
      time: new Date(),
      image: null,
      nom: '',
      prenom: '',
      harfa: '',
      zone: '',
      mobile: '',
      email: '',
      e3: null,
      items: [
          { text: 'Electricien' },
          { text: 'Plombier' },
          { text: 'Maçon' }
      ]
    }
  },
  computed: {
    formIsValid () {
      return this.nom !== '' && this.prenom !== '' && this.imageUrl !== '' && this.mobile !== ''
    },
    submittableDateTime () {
      const date = new Date(this.date)
      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      } else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }
      return date
    }
  },
  methods: {
    onCreateJob () {
      if (!this.formIsValid) {
        return
      }
      if (!this.image) {
        return
      }
      const jodData = {
        title: this.title,
        date: this.submittableDateTime,
        image: this.image,
        description: this.description
      }
      this.$store.dispatch('createJob', jodData)
      this.$router.push('/jobs')
    },
    onCreateEmployer () {
      if (!this.formIsValid) {
        return
      }
      if (!this.image) {
        return
      }
      const employerData = {
        nom: this.nom,
        prenom: this.prenom,
        harfa: this.harfa,
        zone: this.zone,
        image: this.image,
        rate: 1,
        mobile: this.mobile,
        email: this.email
      }
      console.log(employerData)
      this.$store.dispatch('createEmployer', employerData)
      this.$router.push('/')
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>
