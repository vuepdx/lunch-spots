<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col class="grow text-center">
        <v-card :ripple="true">
          <v-card-text>
            <h2>Location Settings</h2>
            <v-text-field
              v-model="searchText"
              label="Search Location"
              @keyup.enter="searchLocation(searchText)"
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { openStreetMap } from '@utils/api'
import { userMethods } from '@state/helpers'

export default {
  page: {
    title: 'Settings',
    meta: [{ name: 'description', content: 'The Settings page.' }],
  },
  name: 'Settings',
  components: {},
  props: {},
  data() {
    return {
      searchText: '',
      searchItems: [],
    }
  },
  computed: {},
  methods: {
    ...userMethods,
    searchLocation({ commit }, searchText) {
      openStreetMap.get('search', {
        params: {
          format: 'json',
          q: searchText,
        },
      })
      // .then((res) => {
      //   console.log(res)
      // })
    },
  },
}
</script>
