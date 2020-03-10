<template>
  <v-container class="fill-height">
    <search-form></search-form>
    <result-list></result-list>
  </v-container>
</template>

<script>
import SearchForm from '@components/SearchForm.vue'
import ResultList from '@components/ResultList.vue'

export default {
  name: 'Home',
  components: {
    'search-form': SearchForm,
    'result-list': ResultList,
  },
}
</script>
