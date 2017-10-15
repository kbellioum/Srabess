<template>
  <v-container>
    <!-- <v-layout>
      <v-flex>
        <v-card>
          <v-card-title primary-title>
              <h4>My profile</h4>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs4>

              </v-flex>
              <v-flex xs4>

              </v-flex>
              <v-flex xs4 elevation-4 mb-2>
                <v-card-media :src="employer.imageUrl" height="200px">

                </v-card-media>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs4>
                <v-text-field
                  name="input-3"
                  label="Nom"
                  :value="employer.nom"
                  disabled
                ></v-text-field>
              </v-flex>
                <v-flex xs4>
                <v-text-field
                  name="input-3"
                  label="Prenom"
                  :value="employer.prenom"
                  disabled
                ></v-text-field>
              </v-flex>
                <v-flex xs4>
                <v-text-field
                  name="input-3"
                  label="Harfa"
                  :value="employer.harfa"
                  disabled
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs4>
                <v-text-field
                  name="input-3"
                  label="Zone d'intervention"
                  :value="employer.zone"
                  disabled
                ></v-text-field>
              </v-flex>

            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn primary--text>OK</v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>
    </v-layout> -->
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title>
            <v-btn icon to="/">
              <v-icon>chevron_left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon class="mr-3">
              <v-icon>edit</v-icon>
            </v-btn>
            <!-- <v-btn dark icon>
              <v-icon>more_vert</v-icon>
            </v-btn> -->
          </v-card-title>
          <v-card-media :src="employer.imageUrl" height="300px">
            <v-layout column class="media">

              <v-spacer></v-spacer>
              <v-card-title class="white--text pl-5 pt-5">
                <!-- <div class="display-1 pl-5 pt-5">{{employer.nom}} {{employer.prenom}}</div> -->
              </v-card-title>
            </v-layout>
          </v-card-media>
          <v-list two-line>
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon class="indigo--text">people</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{employer.nom}} {{ employer.prenom }}</v-list-tile-title>
                <v-list-tile-sub-title>Nom & Prenom</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          <v-divider inset></v-divider>
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon class="indigo--text">phone</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{employer.mobile}}</v-list-tile-title>
                <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          <v-divider inset></v-divider>
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon class="indigo--text">mail</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ employer.email }}</v-list-tile-title>
                <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

          </v-list>
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
  data () {
    return {
      nom: '',
      prenom: '',
      zone: '',
      harfa: '',
      mobile: '',
      email: ''
    }
  },
  computed: {
    employer () {
      return this.$store.getters.loadedEmployersByUserId(this.id)
    }
  }
}

</script>
