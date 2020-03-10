import { mapState, mapGetters, mapActions } from 'vuex'

export const userComputed = {
  ...mapState('user', {
    location: (state) => state.location,
  }),
  ...mapGetters('user', ['location', 'specificLocation']),
}

export const userMethods = mapActions('user', [
  'getGeoLocation',
  'searchLocation',
])
