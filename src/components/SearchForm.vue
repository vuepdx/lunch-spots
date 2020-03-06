<template>
  <v-form ref="form" v-model="valid" lazy-validation class="flex-grow-1 pa-3">
    <v-row>
      <v-col sm="5" class="py-0">
        <v-text-field v-model="search" label="Search Term" append-icon="mdi-magnify" solo @keyup.enter="submitForm()"></v-text-field>
      </v-col>
      <v-col sm="5" class="py-0">
        <v-combobox v-model="categories" :rules="categoryRules" :items="categoryTypes" item-text="key" item-value="value" multiple small-chips required solo label="Food Categories"></v-combobox>
      </v-col>
      <v-col sm="2" class="py-0">
        <v-select v-model="sort" :items="sortBy" label="Sort By" solo></v-select>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-spacer></v-spacer>
      <v-col class="text-right">
        <v-btn class="mx-4 px-6" ripple @click="clearForm()">clear</v-btn>
        <v-btn class="px-6" ripple color="primary" :loading="loading" :disabled="loading || !specificLocation" @click="submitForm()">search</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
import categoryTypes from '@/assets/categories'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SearchForm',
  data () {
    return {
      rating: null,
      valid: true,
      categoryTypes: categoryTypes,
      categoryRules: [
        v => ((v && !!v.length) || (this.search && !!this.search.length)) || 'Category or search term is required'
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
