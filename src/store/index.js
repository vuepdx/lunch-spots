import Vue from 'vue'
import Vuex from 'vuex'
import round from 'lodash/round'
import { http, yelp } from '@/xhr'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    geolocation: true,
    location: null,
    spots: [],
    form: {
      search: '',
      distance: 1,
      sort: 'best_match',
      categories: [
        { key: 'Food (All)', value: 'food' }
      ]
    }
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setLocation (state, payload) {
      if (!payload) {
        state.geolocation = false
      } else {
        state.location = payload
      }
    },
    getSpots (state, payload) {
      state.loading = false
      state.total = payload.total
      state.spots = payload.businesses
    },
    setSearchField (state, { key, value }) {
      state.form[key] = value
    }
  },
  actions: {
    getGeoLocation ({ commit, dispatch }) {
      navigator.permissions.query({ name: 'geolocation' }).then(result => {
        console.log(result)
      })
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const location = {
          lat: coords.latitude,
          lon: coords.longitude
        }
        dispatch('getGeoLocationDetails', location)
      }, error => {
        console.warn(error)
        commit('setLocation', false)
      })
    },
    getGeoLocationDetails ({ commit, state }, payload) {
      let location = payload
      if (!location) {
        location = state.location
      }
      return http.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          format: 'json',
          lat: location.lat,
          lon: location.lon
        }
      }).then(({ data: { address } }) => {
        const response = {
          ...location,
          ...address
        }
        commit('setLocation', response)
      }).catch(err => {
        console.warn(err)
        commit('setLocation', location)
      })
    },
    getSpots ({ state, commit }) {
      if (!state.location) return
      const { form, location } = state

      const data = {
        params: {
          limit: 50,
          radius: 3000,
          sort_by: 'distance',
          term: form.search,
          latitude: location.lat,
          longitude: location.lon,
          categories: form.categories.map(c => c.value)
        }
      }
      commit('setLoading', true)
      yelp.get('businesses/search', data).then(res => {
        commit('getSpots', res.data)
      }).catch(err => {
        commit('getSpots', {
          total: null,
          businesses: null
        })
        console.error(err)
      })
    },
    setSearchField ({ commit }, payload = {}) {
      if (['key', 'value'].every(entry => Object.prototype.hasOwnProperty.call(payload, entry))) {
        return commit('setSearchField', payload)
      }
      Object.entries(payload).forEach(([key, value]) => commit('setSearchField', { key, value }))
    }
  },
  getters: {
    form: state => state.form,
    spots: state => state.spots,
    loading: state => state.loading,
    location: state => state.location,
    specificLocation: ({ location }) => {
      if (!location) return null
      else if (location.suburb) return location.suburb
      else if (location.city && location.state) return `${location.city}, ${location.state}`
      else return `Latitude: ${round(location.lat, 5)}, Longitude: ${round(location.lon, 5)}`
    }
  }
})
