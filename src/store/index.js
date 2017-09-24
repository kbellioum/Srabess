import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedJobs: [
      // { imageUrl: 'https://unsplash.it/200/400/', id: '1', title: 'First_Job', date: new Date(), description: 'decription 1' },
      // { imageUrl: 'https://unsplash.it/200/300/?random', id: '2', title: 'Second_Job', date: new Date(), description: 'decription 2' },
      // { imageUrl: 'https://unsplash.it/200/300/', id: '3', title: 'Third_Job', date: new Date(), description: 'decription 3' }
    ],
    employers: [
      // { header: 'Employers' },
      // { id: '1', nom: 'Alami', prenom: 'Hamid', harfa: 'Sabbak', rate: 2, imageUrl: 'http://theracecardproject.com/wp-content/uploads/2013/08/1000323_10153108963830582_1407934602_n-300x300.jpg', zone: 'Casablanca' },
      // { divider: true, inset: true },
      // { id: '2', nom: 'Moutawakil', prenom: 'Karim', harfa: 'Mecanicien', rate: 3, imageUrl: 'https://www.drhilinski.com/wp-content/uploads/rmgallery2/RMG2510256085-6899-a/original.jpg', zone: 'Agadir' },
      // { divider: true, inset: true },
      // { id: '3', nom: 'Naciri', prenom: 'Mohamed', harfa: 'Electricien', rate: 4, imageUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/000/119/1f7/006c98a.jpg', zone: 'Rabat' },
      // { divider: true, inset: true },
      // { id: '4', nom: 'Yahiaoui', prenom: 'Amine', harfa: 'Nejjar', rate: 5, imageUrl: 'https://v.cdn.vine.co/r/avatars/54ADEF01C01230958909008314368_39198044266.4.1.jpg?versionId=hdUOUWNjiz13.LhUmRr7hxMBlC2cxutt', zone: 'Maroc' }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    registerUserForJob (state, payload) {
      const id = payload.id
      if (state.user.registeredJobs.findIndex(job => job.id === id) >= 0) {
        return
      }
      state.user.registeredJobs.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserFromJob (state, payload) {
      const registeredJobs = state.user.registeredJobs
      registeredJobs.splice(registeredJobs.findIndex(job => job.id === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    setLoadedJobs (state, payload) {
      state.loadedJobs = payload
    },
    setLoadedEmployers (state, payload) {
      state.employers = payload
    },
    createJob (state, payload) {
      state.loadedJobs.push(payload)
    },
    createEmployer (state, payload) {
      state.employers.push(payload)
      console.log(payload)
    },
    updateJob (state, payload) {
      const job = state.loadedJobs.find(job => {
        return job.id === payload.id
      })
      if (payload.title) {
        job.title = payload.title
      }
      if (payload.description) {
        job.description = payload.description
      }
      if (payload.date) {
        job.date = payload.date
      }
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    registerUserForJob ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/Registration/')
        .push(payload)
        .then(data => {
          commit('setLoading', false)
          commit('registerUserForJob', {
            id: payload,
            fbKey: data.key
          })
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    unregisterUserFromJob ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/Registration/').child(fbKey)
        .remove()
        .then(() => {
          commit('setLoading', false)
          commit('unregisterUserFromJob', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    loadEmployers ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('employers').once('value')
        .then((data) => {
          const employers = [{ header: 'Employers' }]
          const obj = data.val()
          for (let key in obj) {
            employers.push({ divider: true, inset: true })
            employers.push({
              id: key,
              nom: obj[key].nom,
              prenom: obj[key].prenom,
              harfa: obj[key].harfa,
              zone: obj[key].zone,
              imageUrl: obj[key].imageUrl,
              userid: obj[key].userid
            })
          }
          commit('setLoadedEmployers', employers)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    loadJobs ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('jobs').once('value')
        .then((data) => {
          const jobs = []
          const obj = data.val()
          for (let key in obj) {
            jobs.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedJobs', jobs)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createEmployer ({commit, getters}, payload) {
      const employer = {
        nom: payload.nom,
        prenom: payload.prenom,
        harfa: payload.harfa,
        zone: payload.zone,
        userid: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('employers').push(employer)
        .then(
          (data) => {
            console.log(data)
            key = data.key
            return key
          }
        )
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('employers/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('employers').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createEmployer', {
            ...employer,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
    },
    createJob ({commit, getters}, payload) {
      const job = {
        title: payload.title,
        date: payload.date.toISOString(),
        description: payload.description,
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('jobs').push(job)
        .then(
          (data) => {
            console.log(data)
            key = data.key
            return key
          }
        )
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('jobs/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('jobs').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createJob', {
            ...job,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
    },
    updateJobData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase.database().ref('jobs').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateJob', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredJobs: [],
            fbKeys: {}
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredJobs: [],
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredJobs: [], fbKeys: {}})
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/Registration/').once('value')
        .then(data => {
          const dataPairs = data.val()
          let registeredJobs = []
          let swappedPairs = {}
          for (let key in dataPairs) {
            registeredJobs.push(dataPairs[key])
            swappedPairs[dataPairs[key]] = key
          }
          const updatedUser = {
            id: getters.user.id,
            registeredJobs: registeredJobs,
            fbKeys: swappedPairs
          }
          commit('setLoading', false)
          commit('setUser', updatedUser)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
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
    },
    loadedEmployer (state) {
      return (employerId) => {
        return state.employers.find((employer) => {
          return employer.id === employerId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    loadedEmployers (state) {
      return state.employers.sort((empA, empB) => {
        return empA.rate < empB.rate
      })
    }
  }
})
