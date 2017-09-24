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
                     <div class="headline">{{ employer.nom}} {{ employer.prenom }} </div>
                     <div>{{ employer.harfa }}</div>
                     <div>{{ employer.zone }}</div>
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
    computed: {
      employer () {
        return this.$store.getters.loadedEmployer(this.id)
      }
    }
  }
</script>
