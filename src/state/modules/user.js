import { http } from '@utils/api'
import round from 'lodash/round'

export const state = {
  location: getSavedState('user.location') || null,
  geolocation: true,
}

export const mutations = {
  setLocation(state, payload) {
    if (!payload) {
      state.geolocation = false
    } else {
      state.location = payload
      saveState('user.location', payload)
    }
  },
}

export const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  init({ dispatch }) {
    dispatch('validate')
  },
  getGeoLocation({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const location = {
            lat: coords.latitude,
            lon: coords.longitude,
          }
          dispatch('getGeoLocationDetails', location)
          resolve(true)
        },
        (error) => {
          reject(error)
          console.error(error)
          commit('setLocation', false)
        }
      )
    })
  },
  getGeoLocationDetails({ commit, state }, payload) {
    let location = payload
    if (!location) {
      location = state.location
    }
    return http
      .get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          format: 'json',
          lat: location.lat,
          lon: location.lon,
        },
      })
      .then(({ data: { address } }) => {
        const response = {
          ...location,
          ...address,
        }
        commit('setLocation', response)
      })
      .catch((err) => {
        console.warn(err)
        commit('setLocation', location)
      })
  },
  searchLocation({ commit }) {
    commit(commit('setLocation', null))
  },
  // Validates the current user's location
  validate({ dispatch, state }) {
    if (!state.location) return dispatch('getGeoLocation')

    return state.location
  },
  // Logs out the current user.
  logOut({ commit }) {
    commit('setLocation', null)
  },
}

export const getters = {
  location: (state) => state.location,
  specificLocation: ({ location }) => {
    if (!location) return null
    else if (location.suburb) return location.suburb
    else if (location.city && location.state)
      return `${location.city}, ${location.state}`
    else
      return `Latitude: ${round(location.lat, 5)}, Longitude: ${round(
        location.lon,
        5
      )}`
  },
}

// ===
// Private helpers
// ===

function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state))
}
