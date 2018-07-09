<template>
  <div>
    <h2>Number of Lunch Spots 20 of {{total}}</h2>
    <ul>
      <li v-for="s in spots" :key="s.id">
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
          radius: 300,
          categories: 'food',
          latitude: this.location.lat,
          longitude: this.location.long,
          sort_by: 'distance'
        }
      }
      this.$http.get('businesses/search', data).then(res => {
        const response = res.data
        console.log(res)
        this.spots = response.businesses
        this.total = response.total
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
