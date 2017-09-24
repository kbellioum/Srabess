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
    <v-layout row wrap elevation-2>
      <v-flex xs12>
        <v-list two-line >
            <template v-for="item in employers">
              <v-subheader v-if="item.header" v-text="item.header"></v-subheader>
              <v-divider v-else-if="item.divider" :inset="item.inset"></v-divider>
              <v-list-tile avatar v-else @click="" :to="'/employer/' + item.id">
                <v-list-tile-avatar>
                  <img :src="item.imageUrl" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.nom + ' ' + item.prenom"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item.harfa + ' — ' + item.zone"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
      </v-flex>

    </v-layout>

  </v-container>

</template>
<script>
  export default {
    data () {
      return {
      }
    },
    computed: {
      employers () {
        return this.$store.getters.loadedEmployers
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>
