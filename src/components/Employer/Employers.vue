<template>
  <v-container>
    <!-- <v-layout v-for="employer in employers" :key="employer.name" class="mb-2">
      <v-flex xs12>
        <v-card>
          <v-container fluid class="pa-0">
            <v-layout row >
              <v-flex xs5 sm4 md3>
                <v-card-media :src="employer.imageUrl" height="100%" >
                </v-card-media>
              </v-flex>
              <v-flex xs5 sm8 md9>
                <v-card-title primary-title>
                  <v-flex xs5 sm8 md9>
                    <div>
                      <h3 class="headline mb-0">{{employer.nom}} {{ employer.prenom }}</h3>
                    </div>
                  </v-flex>
                </v-card-title>
                <v-card-text>
                  <div>
                    <div><v-icon>work</v-icon> {{ employer.harfa }}</div>
                    <div><v-icon>room</v-icon> {{ employer.zone }}</div>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-btn flat class="primary--text">Details</v-btn>
                      <v-btn flat class="primary--text">Evaluer</v-btn>
                    </v-flex>
                  </v-layout>
                </v-card-actions>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                  <v-flex right>
                    <div >
                      <v-icon v-for="i in employer.rate" :key="i" class="amber--text darken-4">star</v-icon>
                    </div>
                  </v-flex>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>



      </v-flex>
    </v-layout> -->
    <v-layout row wrap elevation-2>
      <v-flex xs12>
        <v-list two-line >
            <template v-for="item in employers">
              <v-subheader v-if="item.header" v-text="item.header"></v-subheader>
              <v-divider v-else-if="item.divider" :inset="item.inset"></v-divider>
              <v-list-tile avatar v-else @click="">
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

<!-- <v-container>
  <v-card>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 offset-sm3>
      <v-card-media src="https://dummyimage.com/600x400/000/fff.png&text=Employer1" height="200px">
      </v-card-media>
      </v-flex>
    </v-layout>
  </v-card>
</v-container> -->

</template>
<script>
  export default {
    data () {
      return {
        items: [
          { header: 'Today' },
          { avatar: 'https://www.drhilinski.com/wp-content/uploads/rmgallery2/RMG2510256085-6899-a/original.jpg',
            title: 'Brunch this weekend?',
            subtitle: "<span class='grey--text text--darken-2'>Ali Connors</span> — I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
          { divider: true, inset: true },
          { avatar: 'https://www.drhilinski.com/wp-content/uploads/rmgallery2/RMG2510256085-6899-a/original.jpg',
            title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
            subtitle: "<span class='grey--text text--darken-2'>to Alex, Scott, Jennifer</span> — Wish I could come, but I'm out of town this weekend." },
          { divider: true, inset: true },
          { avatar: 'https://www.drhilinski.com/wp-content/uploads/rmgallery2/RMG2510256085-6899-a/original.jpg',
            title: 'Oui oui',
            subtitle: "<span class='grey--text text--darken-2'>Sandra Adams</span> — Do you have Paris recommendations? Have you ever been?" },
          { divider: true, inset: true },
          { avatar: 'https://www.drhilinski.com/wp-content/uploads/rmgallery2/RMG2510256085-6899-a/original.jpg',
            title: 'Birthday gift',
            subtitle: "<span class='grey--text text--darken-2'>Trevor Hansen</span> — Have any ideas about what we should get Heidi for her birthday?" },
          { divider: true, inset: true },
          { avatar: 'https://www.drhilinski.com/wp-content/uploads/rmgallery2/RMG2510256085-6899-a/original.jpg',
            title: 'Recipe to try',
            subtitle: "<span class='grey--text text--darken-2'>Britta Holt</span> — We should eat this: Grate, Squash, Corn, and tomatillo Tacos." }
        ]
      }
    },
    computed: {
      employers () {
        return this.$store.getters.loadedEmployers
      }
    }
  }
</script>
