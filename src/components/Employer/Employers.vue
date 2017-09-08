<template>
  <v-container>
    <v-layout v-for="i in 6" :key="i" class="mb-2">
      <v-flex xs12>
        <v-card>
          <v-container fluid class="pa-0">
            <v-layout row >
              <v-flex xs5 sm4 md3>
                <v-card-media :src="'https://dummyimage.com/600x400/000/fff.png&text=' + i" height="100%" >
                </v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                    <div>Located two hours south of Sydney in the Southern Highlands of New South Wales, ...</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat class="primary--text">Details</v-btn>
                  <v-btn flat class="primary--text">Evaluer</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>


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
