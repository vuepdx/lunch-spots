<template>
  <div>
    <h2>Number of Lunch Spots: {{spots.length}}</h2>
    <ul>
      <li v-for="s in spots" :key="s.id">
        <img :src="getPhoto(s)">
        <pre>{{s}}</pre>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'App',
  components: {},
  props: {},
  data () {
    return {
      spots: []
    }
  },
  mounted () {
    this.$store.dispatch('getPosition').then(pos => {
      const location = `${pos.lat},${pos.long}`
      this.$http.get('nearbysearch/json', {
        params: {
          sensor: true,
          location: location,
          types: 'restaurant',
          radius: 1000
        }
      }).then(res => {
        this.spots = res.data.results
      })
    })
  },
  computed: {},
  methods: {
    getPhoto (place) {
      const photo = place.photos[0].photo_reference
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=200&photoreference=${photo}&key=${this.$google}`
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
