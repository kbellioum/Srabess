<template>
  <main>
     <v-container>
       <v-layout row wrap>
         <v-flex xs12>
           <v-card class="indigo darken-1 white--text">
             <v-container>
               <v-layout row wrap>
                 <v-flex xs8 sm10 md10 lg10 lx10>
                   <div>
                     <div class="mb-2">
                       <div class="headline">{{ employer.nom}} {{ employer.prenom }} </div>
                       <div><v-icon class="white--text">work</v-icon> {{ employer.harfa }}</div>
                       <div><v-icon class="white--text">room</v-icon> {{ employer.zone }}</div>
                       <div><v-icon class="white--text">phone</v-icon> {{ employer.mobile }}</div>
                       <div><v-icon class="white--text" >email</v-icon> <a :href="'mailto:' + employer.email">{{ employer.email }}</a></div>
                     </div>
                     <v-card class="grey lighten-4 elevation-0">
                       <div>
                         <!-- <v-flex xs8 sm10 md10 lg10 lx10>
                         <p></p>
                         </v-flex> -->
                         <v-alert info :value="true" hide-icon>
                            {{ employer.message }}
                         </v-alert>
                       </div>
                     </v-card>


                     <!-- <v-divider class="white mb-2"></v-divider> -->
                     <app-star :rate="employer.rate"></app-star>
                   </div>
                 </v-flex>
                 <v-flex xs4 sm2 md2 lg2 lx2>
                   <v-layout elevation-4 wrap>
                     <v-flex xs12>
                       <v-card-media
                         :src="employer.imageUrl"
                         height="125px"
                         ></v-card-media>
                     </v-flex>
                   </v-layout>
                 </v-flex>


               </v-layout>
             </v-container>
           </v-card>
         </v-flex>
       </v-layout>
     </v-container>
   </main>

</template>
<script>
  export default {
    props: [
      'id'
    ],
    data () {
      return {
      }
    },
    methods: {
      url () {
        console.log('mailto:' + this.employer.email)
        return 'mailto:' + this.employer.email
      }
    },
    computed: {
      employer () {
        return this.$store.getters.loadedEmployer(this.id)
      }
    }
  }
</script>

<style>
a {
  text-decoration: none;
  color: white;
}

</style>
