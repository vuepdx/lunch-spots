<template>
  <v-container class="fill-height">
    <search-form></search-form>
    <result-list :spots="spots"></result-list>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'spots'
    ])
  },
  methods: {}
}
</script>
