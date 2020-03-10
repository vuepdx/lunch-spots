<template>
  <v-container class="fill-height">
    <search-form></search-form>
    <v-container v-if="spots.length" grid-list-xl>
      <v-layout row wrap>
        <v-flex v-for="spot in spots" :key="spot.id" xs12 md6>
          <lunch-spot :spot="spot"></lunch-spot>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchForm from '@components/SearchForm.vue'
import LunchSpot from '@components/LunchSpot.vue'

export default {
  name: 'Home',
  components: {
    'search-form': SearchForm,
    'lunch-spot': LunchSpot,
  },
  computed: {
    ...mapGetters('search', ['spots', 'loading']),
  },
}
</script>
