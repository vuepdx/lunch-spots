<template>
  <v-app>
    <v-toolbar app dark>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="location">
      <v-btn flat class="text-xs-left">
        LAT: {{location.lat | decimal}}
        <br>LNG: {{location.long | decimal}}
      </v-btn>
      </v-toolbar-items>
      <v-btn v-else icon @click="getLocation()">
        <v-icon>my_location</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer app dark>
      <v-spacer></v-spacer>
      Lunch Spots is powered by
      <img src="https://s3-media3.fl.yelpcdn.com/assets/srv0/yelp_design_web/b085a608c15f/assets/img/logos_desktop/default@2x.png" class="yelp-logo"> &copy; {{ new Date().getFullYear() }}
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import round from 'lodash/round'

export default {
  name: 'App',
  components: {},
  props: {},
  data () {
    return {
      title: 'Lunch Spot Finder'
    }
  },
  created () {
    this.getLocation()
  },
  computed: {
    ...mapGetters(['location'])
  },
  methods: {
    ...mapActions(['getLocation'])
  },
  filters: {
    decimal (value) {
      return round(value, 5)
    }
  }
}
</script>
<style scoped>
.yelp-logo {
  display: inline-block;
  height: 20px;
  margin: -5px 3px 0;
}
</style>
