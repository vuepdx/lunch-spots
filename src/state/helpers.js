import { mapGetters, mapActions } from 'vuex'

export const userComputed = {
  ...mapGetters('user', ['location', 'specificLocation']),
}

export const userMethods = mapActions('user', [
  'getGeoLocation',
  'searchLocation',
])
