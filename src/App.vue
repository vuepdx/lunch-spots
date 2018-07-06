<template>
  <div></div>
</template>
<script>
export default {
  name: 'App',
  components: {},
  props: {},
  data () {
    return {}
  },
  mounted () {
    this.$store.dispatch('getPosition').then(res => {
      console.log(res)
      console.log(this.$google)
    })
  },
  computed: {},
  methods: {}
}
</script>
<style lang="scss" scoped>

</style>
