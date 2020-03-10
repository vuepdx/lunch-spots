<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col class="grow text-center">
        <h1>404</h1>
        <h3>
          <template v-if="resource">
            {{ resource }}
          </template>
          <template v-else>
            {{ key }}
          </template>
          Not Found</h3
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  page: {
    title: '404',
    meta: [{ name: 'description', content: '404' }],
  },
  props: {
    resource: {
      type: String,
      default: '',
    },
  },
}
</script>
