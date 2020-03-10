<template>
  <v-container v-if="spots.length" grid-list-xl>
    <v-layout row wrap>
      <v-flex v-for="(s, i) in spots" :key="s.id" xs12 md6>
        <v-card class="card" :data-index="i">
          <v-img :src="s.image_url" height="250">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-card-title>
            <span class="flex-grow-1">{{ s.name }}</span>
            <v-btn :href="s.url" target="_blank" class="ml-3" icon tile link>
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-subtitle>{{ s.distance | metersToMiles }}</v-card-subtitle>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="s.rating"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>
              <div class="grey--text ml-2"
                >{{ s.rating }} ({{ s.review_count }})</div
              >
            </v-row>
            <div class="my-0 subtitle-1">
              <span v-if="s.price">
                {{ s.price }}
                <v-icon x-small class="mr-1">mdi-square-small</v-icon>
              </span>
              <template v-for="cat in s.categories">
                <v-chip
                  :key="`${i}-${cat.alias}`"
                  x-small
                  label
                  class="mr-2 mb-0"
                  >{{ cat.title }}</v-chip
                >
              </template>
            </div>
            <v-divider class="my-4"></v-divider>
            <div v-if="s.display_phone" class="phone">
              <v-btn :href="`tel:${s.phone}`" class="mr-3" icon tile link>
                <v-icon>mdi-phone</v-icon>
              </v-btn>
              <div class="phone__content">{{ s.display_phone }}</div>
            </div>
            <div class="address">
              <v-btn
                :href="
                  `https://maps.google.com/?q=${s.location.display_address}`
                "
                target="_blank"
                class="mr-3"
                icon
                tile
                link
              >
                <v-icon>mdi-navigation</v-icon>
              </v-btn>
              <div class="address__content">
                <div>{{ s.location.address1 }}</div>
                <div
                  >{{ s.location.city }}, {{ s.location.state }}
                  {{ s.location.zip_code }}</div
                >
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMiles } from '@utils/calculate'
import round from 'lodash/round'

export default {
  name: 'ResultList',
  filters: {
    metersToMiles(value) {
      return `${round(getMiles(value), 2)} miles away`
    },
  },
  computed: {
    ...mapGetters('search', ['spots', 'loading']),
  },
}
</script>

<style lang="scss" scoped>
.card {
  height: 100%;
}

.address,
.phone {
  display: flex;
  margin-top: 1rem;

  &__content {
    display: block;
    align-self: center;
  }
}
</style>
