<template>
  <div>
    <h2>Number of Lunch Spots: {{spots.length}}</h2>
    <pre>{{spots}}</pre>
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
      const location = `${pos.latitude},${pos.longitude}`
      this.$http.get('nearbysearch/json', {
        params: {
          key: this.$google,
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
  methods: {}
}
</script>
<style lang="scss" scoped>

</style>
