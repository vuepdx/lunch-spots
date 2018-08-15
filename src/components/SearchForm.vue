<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card class="pa-4" transparent>
        <v-text-field v-model="search" label="Search Term" append-icon="search" @keyup.enter="submitForm()"></v-text-field>
        <v-combobox v-model="categories" :rules="categoryRules" :items="categoryTypes" item-text="key" item-value="value" multiple small-chips required label="Food Categories"></v-combobox>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn round large @click="clearForm()">
            clear
          </v-btn>
          <v-btn round large color="primary" :loading="loading" :disabled="loading || !location" @click="submitForm()">
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
      categoryTypes: categoryTypes,
      categoryRules: [
        v => (v && v.length && !this.search.length) || 'Category or Search term is required'
      ]
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
        this.searchCategories(value)
      }
    }
  },
  methods: {
    ...mapActions(['getSpots', 'searchText', 'searchCategories']),
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
