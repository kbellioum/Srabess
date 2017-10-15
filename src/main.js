import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'
import StarCmp from './components/Shared/star.vue'
import EditJobDetailsDialog from './components/Jobs/Edit/EditJobDetailsDialog.vue'
import EditJobDateDialog from './components/Jobs/Edit/EditJobDateDialog.vue'
import EditJobTimeDialog from './components/Jobs/Edit/EditJobTimeDialog.vue'
import RegisterDialog from './components/Jobs/Registration/RegisterDialog.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-star', StarCmp)
Vue.component('app-edit-job-details-dialog', EditJobDetailsDialog)
Vue.component('app-edit-job-date-dialog', EditJobDateDialog)
Vue.component('app-edit-job-time-dialog', EditJobTimeDialog)
Vue.component('app-job-register-dialog', RegisterDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDPzlqbQ5XD4rka1Z6Vg1CxovId-6r0zYA',
      authDomain: 'srabess-edb1a.firebaseapp.com',
      databaseURL: 'https://srabess-edb1a.firebaseio.com',
      projectId: 'srabess-edb1a',
      storageBucket: 'gs://srabess-edb1a.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    // this.$store.dispatch('loadJobs')
    this.$store.dispatch('loadEmployers')
  }
})
