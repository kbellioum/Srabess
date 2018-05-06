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
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <!-- <v-text-field name="harfa" label="Harfa" id="harfa" v-model="harfa" required>

        </v-text-field> -->
        <v-select
          label="Choisir le filtre d'affichage"
          v-bind:items="items"
          v-model="e3"
          item-value="text"
          required

        ></v-select>

      </v-flex>
    </v-layout>
    <v-layout row wrap elevation-2>
      <v-flex xs12>
        <v-list two-line >
            <template v-for="item in selected">
              <v-subheader v-if="item.header" v-text="item.header">Employers</v-subheader>
              <v-divider v-else-if="item.divider" :inset="item.inset"></v-divider>
              <v-list-tile avatar v-else @click="" :to="'/employer/' + item.id">
                <v-list-tile-avatar>
                  <img :src="item.imageUrl" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title >{{item.nom}} {{item.prenom}} - <small class="grey--text">{{item.rate}}</small><img class="mysize" src="../../assets/star.png" alt=""></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item.harfa + ' — ' + item.zone"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
      </v-flex>

      <!-- <v-flex xs12>
        <v-divider></v-divider>
        <v-list>
           <v-list-tile avatar v-for="item in employers" :key="item.nom" @click="">
             <v-list-tile-action>
                <v-icon v-if="item.nom" class="pink--text">star</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="item.prenom"></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-avatar>
                <img :src="item.imageUrl"/>
              </v-list-tile-avatar>
            </v-list-tile>
          </v-list>
      </v-flex> -->

    </v-layout>

  </v-container>

</template>
<script>
  export default {
    data () {
      return {
        e3: null,
        items: [
            { text: 'Electricien' },
            { text: 'Plombier' },
            { text: 'Maçon' },
            { text: 'Peinture' },
            { text: 'Mécanicien' },
            { text: 'Tapisserie' },
            { text: 'Jardinage' },
            { text: 'TV & HiFi' },
            { text: 'Petit Travaux' },
            { text: 'Menuisier' },
            { text: 'Chauffeur' },
            { text: 'Forgeron' },
            { text: 'Décoration' }
        ]
      }
    },
    computed: {
      selected () {
        return this.employers.filter(item => item.harfa === this.e3)
      },
      employers () {
        return this.$store.getters.loadedEmployers
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

<style>

.star-tiny.star-full {
    height: 10px;
    width: 10px;
    background: url(/../../assets/star.png) no-repeat center fixed;
    background-size: cover;
}
.mysize {
  height: 10px;
  width: 10px;
}
</style>
