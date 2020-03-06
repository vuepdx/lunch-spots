<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <!-- <v-card class="pa-4" transparent> -->
    <v-text-field v-model="search" label="Search Term" append-icon="mdi-magnify" outlined @keyup.enter="submitForm()"></v-text-field>
    <v-combobox v-model="categories" :rules="categoryRules" :items="categoryTypes" item-text="key" item-value="value" multiple small-chips required outlined label="Food Categories"></v-combobox>
    <v-select v-model="sort" :items="sortBy" label="Sort By" outlined></v-select>
    <!-- <v-subheader class="pl-0">Distance</v-subheader>
    <v-slider v-model="distance" thumb-label="always"></v-slider>-->
    <v-slider v-model="distance" :hint="`${distance} mi.`" track-color="grey" min="0" max="10" tick-size="2" step="0.25" thumb-label="always" always-dirty persistent-hint>
      <template v-slot:prepend>
        <v-icon @click="distance = (distance - 0.25) || 0">mdi-minus</v-icon>
      </template>

      <template v-slot:append>
        <v-icon @click="distance = (distance + 0.25) || 10">mdi-plus</v-icon>
      </template>
    </v-slider>
    <v-rating v-model="rating" length="4" empty-icon="mdi-currency-usd-off" full-icon="mdi-currency-usd" clearable hover large></v-rating>
    <!-- <v-card-actions> -->
    <v-spacer></v-spacer>
    <v-btn min-width="120" class="px-3 mr-3" large bottom ripple @click="clearForm()">clear</v-btn>
    <v-btn min-width="120" closs="px-5" large ripple color="primary" bottom :loading="loading" :disabled="loading || !specificLocation" @click="submitForm()">Find Lunch Spots</v-btn>
    <!-- </v-card-actions> -->
    <!-- </v-card> -->
  </v-form>
</template>
<script>
import categoryTypes from '@/assets/categories'
import { mapActions, mapGetters } from 'vuex'
// best_match, rating, review_count or distance

export default {
  name: 'SearchForm',
  components: {},
  props: {},
  data () {
    return {
      rating: null,
      valid: true,
      categoryTypes: categoryTypes,
      categoryRules: [
        v => ((v && !!v.length) || !!this.search.length) || 'Category is required'
      ],
      sortBy: [
        { text: 'Best Match', value: 'best_match' },
        { text: 'Rating', value: 'rating' },
        { text: 'Review Count', value: 'review_count' },
        { text: 'Distance', value: 'distance' }
      ]
    }
  },
  computed: {
    ...mapGetters(['form', 'loading', 'specificLocation']),
    search: {
      get () {
        return this.form.search
      },
      set (value) {
        this.setSearchField({ key: 'search', value })
      }
    },
    categories: {
      get () {
        return this.form.categories
      },
      set (value) {
        this.setSearchField({ key: 'categories', value })
      }
    },
    distance: {
      get () {
        return this.form.distance
      },
      set (value) {
        this.setSearchField({ key: 'distance', value })
      }
    },
    sort: {
      get () {
        return this.form.sort
      },
      set (value) {
        this.setSearchField({ key: 'sort', value })
      }
    }
  },
  methods: {
    ...mapActions(['getSpots', 'setSearchField']),
    submitForm () {
      if (this.$refs.form.validate()) {
        this.getSpots()
      }
    },
    clearForm () {
      this.$refs.form.reset()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
