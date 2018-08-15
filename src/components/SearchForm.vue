<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card class="pa-4" transparent>
        <v-text-field v-model="search" label="Search" append-icon="search" solo></v-text-field>
        <v-combobox v-model="categories" :items="categoryTypes" item-text="key" item-value="value" multiple small-chips solo label="Food Categories"></v-combobox>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn round large color="primary" :loading="loading" :disabled="loading || !location" @click="getSpots()">
            Find Lunch Spots
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>
<script>
import categoryTypes from '@/assets/categories'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SearchForm',
  components: {},
  props: {},
  data () {
    return {
      valid: true,
      categoryTypes: categoryTypes
    }
  },
  computed: {
    ...mapGetters(['form', 'loading', 'location']),
    search: {
      get () {
        return this.form.search
      },
      set (value) {
        this.searchText(value)
      }
    },
    categories: {
      get () {
        return this.form.categories
      },
      set (value) {
        console.log(value)
        this.searchCategories(value)
      }
    }
  },
  methods: {
    ...mapActions(['getSpots', 'searchText', 'searchCategories'])
  }
}
</script>
<style lang="scss" scoped>
</style>
