import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    location: null,
    spots: [],
    form: {
      search: '',
      categories: [
        { key: 'Food (All)', value: 'food' }
      ]
    }
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    getLocation (state, payload) {
      state.location = payload
    },
    getSpots (state, payload) {
      state.loading = false
      state.total = payload.total
      state.spots = payload.businesses
    },
    searchText (state, payload) {
      state.form.search = payload
    },
    searchCategories (state, payload) {
      state.form.categories = payload
    }
  },
  actions: {
    getLocation ({ commit, state }) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(pos => {
          const location = {
            lat: pos.coords.latitude,
            long: pos.coords.longitude
          }
          commit('getLocation', location)
          resolve(location)
        })
      })
    },
    getSpots ({ state, commit }, payload) {
      if (!state.location) return

      const categories = state.form.categories.map(c => c.value)
      const data = {
        params: {
          limit: 50,
          radius: 3000,
          categories: categories,
          term: state.form.search,
          latitude: state.location.lat,
          longitude: state.location.long,
          sort_by: 'distance'
        }
      }
      commit('setLoading', true)
      axios.get('businesses/search', data).then(res => {
        commit('getSpots', res.data)
      }).catch(err => {
        commit('getSpots', {
          total: null,
          businesses: null
        })
      })
    },
    searchText ({ commit }, payload) {
      commit('searchText', payload)
    },
    searchCategories ({ commit }, payload) {
      commit('searchCategories', payload)
    }
  },
  getters: {
    loading: state => state.loading,
    location: state => state.location,
    spots: state => state.spots,
    form: state => state.form
  }
})
