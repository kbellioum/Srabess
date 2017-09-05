<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ job.title }}</h6 >
          </v-card-title>
          <v-card-media
          :src='job.imageUrl'
          height="400px"

          >

          </v-card-media>
          <v-card-text>
            <div class="info--text">{{ job.date }}</div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nesciunt nisi, dignissimos tenetur, amet cum iusto tempore consectetur beatae exercitationem quaerat cupiditate dolor aut quidem quisquam mollitia aspernatur rem reiciendis. Qui pariatur excepturi voluptates ad quod soluta esse iusto error?
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
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
      }
    }
  }
</script>
