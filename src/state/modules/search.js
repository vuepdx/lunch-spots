import { yelp } from '@utils/api'

export const state = {
  loading: false,
  spots: [],
  form: {
    search: '',
    sort: 'best_match',
    categories: [{ key: 'Food (All)', value: 'food' }],
  },
}

export const mutations = {
  setLoading(state, loading) {
    state.loading = loading
  },
  setSearchField(state, { key, value }) {
    state.form[key] = value
  },
  getSpots(state, payload) {
    state.loading = false
    state.total = payload.total
    state.spots = payload.businesses
  },
}

export const actions = {
  setLoading({ commit }, loading = false) {
    commit('setLoading', loading)
  },
  setSearchField({ commit }, payload = {}) {
    if (
      ['key', 'value'].every((entry) =>
        Object.prototype.hasOwnProperty.call(payload, entry)
      )
    ) {
      return commit('setSearchField', payload)
    }
    Object.entries(payload).forEach(([key, value]) =>
      commit('setSearchField', { key, value })
    )
  },
  getSpots({ rootState, state, commit }, pageOffset = null) {
    const { form } = state
    const { location } = rootState.user
    if (!location) return

    const data = {
      params: {
        limit: 50,
        radius: 5000,
        term: form.search,
        sort_by: form.sort,
        offset: pageOffset,
        latitude: location.lat,
        longitude: location.lon,
        categories: form.categories.map((c) => c.value).toString(),
      },
    }
    commit('setLoading', true)
    yelp
      .get('businesses/search', data)
      .then((res) => {
        commit('getSpots', res.data)
      })
      .catch((err) => {
        commit('getSpots', {
          total: null,
          businesses: null,
        })
        console.error(err)
      })
  },
}

export const getters = {
  form: (state) => state.form,
  spots: (state) => state.spots,
  loading: (state) => state.loading,
}
