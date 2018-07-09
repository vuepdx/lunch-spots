<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title>Lunch Spot Finder</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-card v-if="spots.length">
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12 v-for="s in spots" :key="s.id">
              <v-card>
                <v-container fluid grid-list-lg>
                  <v-layout row>
                    <v-flex xs9>
                      <div>
                        <div class="headline">{{s.name}}</div>
                        <div>{{s.categories.map(c => c.title).join(', ')}}</div>
                      </div>
                    </v-flex>
                    <v-flex xs3>
                      <v-card-media :src="s.image_url" height="125px" contain></v-card-media>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <router-view></router-view>
    </v-content>
    <v-footer app>
      <span>Lunch-Spots powered by &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  props: {},
  data () {
    return {
      title: '',
      location: null,
      spots: [],
      total: 0
    }
  },
  mounted () {
    this.$store.dispatch('getPosition').then(position => {
      this.location = position
      this.getPlaces()
    })
  },
  computed: {},
  methods: {
    getPlaces () {
      let data = {
        params: {
          limit: 50,
          radius: 300,
          categories: 'food',
          latitude: this.location.lat,
          longitude: this.location.long,
          sort_by: 'distance'
        }
      }
      this.$http.get('businesses/search', data).then(res => {
        const response = res.data
        this.total = response.total
        this.spots = response.businesses
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
