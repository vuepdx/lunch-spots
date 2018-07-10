<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card class="pa-4">
      <v-text-field v-model="search" label="Seaarch" outline append-icon="search"></v-text-field>
      <v-combobox v-model="category" :items="categories" item-text="key" item-value="value" chips multiple outline label="I use chips"></v-combobox>
      <v-btn @click="submit">
        submit
      </v-btn>
      <v-btn @click="clear">clear</v-btn>
    </v-card>
  </v-form>
</template>
<script>
import categories from '@/assets/categories'

export default {
  name: 'SearchForm',
  components: {},
  props: {},
  data () {
    return {
      valid: true,
      search: '',
      category: ['food'],
      categories: categories
    }
  },
  computed: {},
  methods: {
    submit () { },
    clear () { }
  }
}
</script>
<style lang="scss" scoped>
</style>
