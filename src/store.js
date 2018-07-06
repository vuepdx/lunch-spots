import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    position: null
  },
  mutations: {
    getPosition (state, payload) {
      state.position = payload
    }
  },
  actions: {
    getPosition ({ commit }) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(pos => {
          const position = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
          console.log('it is hitß')
          resolve(position)
          commit('getPosition', position)
        })
      })
    }
  }
})
