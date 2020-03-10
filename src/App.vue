<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped temporary bottom>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ title }}
          </v-list-item-title>
          <v-list-item-subtitle v-if="specificLocation">
            <v-icon class="mb-1 mr-1" small>mdi-map-marker</v-icon>
            {{ specificLocation }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list dense>
        <v-list-item link exact :to="{ name: 'Home' }">
          <v-list-item-action>
            <v-icon>mdi-home-city</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ name: 'About' }">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Location Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-if="specificLocation" depressed class="d-none d-sm-flex">
          {{ specificLocation }}
        </v-btn>
        <v-btn v-else icon @click="getGeoLocation">
          <v-icon>mdi-crosshairs-gps</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view :key="$route.fullPath"></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <v-spacer></v-spacer>Lunch Spots is powered by
      <img
        src="https://s3-media3.fl.yelpcdn.com/assets/srv0/yelp_design_web/b085a608c15f/assets/img/logos_desktop/default@2x.png"
        class="logo"
      />
      &copy; {{ new Date().getFullYear() }}
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
import appConfig from '@src/app.config'
import { userComputed, userMethods } from '@state/helpers'

export default {
  name: 'App',
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title
      return title ? `${title} | ${appConfig.title}` : appConfig.title
    },
  },
  data() {
    return {
      drawer: false,
      title: 'Lunch Spot Finder',
    }
  },
  computed: {
    ...userComputed,
  },
  created() {
    this.getGeoLocation()
  },
  methods: {
    ...userMethods,
  },
}
</script>

<style scoped>
.logo {
  display: inline-block;
  height: 20px;
  margin: -5px 3px 0;
}
</style>
