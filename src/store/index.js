import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedJobs: [
      { imageUrl: 'https://unsplash.it/200/400/', id: '1', title: 'First_Job', date: '2017-07-17' },
      { imageUrl: 'https://unsplash.it/200/300/?random', id: '2', title: 'Second_Job', date: '2017-07-16' },
      { imageUrl: 'https://unsplash.it/200/300/', id: '3', title: 'Third_Job', date: '2017-07-18' }
    ],
    user: {
      id: 'jhsdhdjshjh',
      registeredJobs: ['1']
    }
  },
  mutations: {},
  actions: {},
  getters: {
    loadedJobs (state) {
      return state.loadedJobs.sort((jobA, jobB) => {
        return jobA.date > jobB.date
      })
    },
    featuredJobs (state, getters) {
      return getters.loadedJobs.slice(0, 5)
    },
    loadedJob (state) {
      return (jobId) => {
        return state.loadedJobs.find((job) => {
          return job.id === jobId
        })
      }
    }
  }
})
