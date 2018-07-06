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
    getPosition ({context}) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(pos => {
          const position = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          }
          resolve(position)
          context.commit('getPosition', position)
        })
      })
    }
  }
})
