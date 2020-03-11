<template>
  <v-card class="card">
    <slot>
      <v-img :src="spot.image_url" height="250">
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
        <span class="flex-grow-1">{{ spot.name }}</span>
        <v-btn :href="spot.url" target="_blank" class="ml-3" icon tile link>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle
        >{{ spot.distance | distanceFormat }} meters away.</v-card-subtitle
      >
      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :value="spot.rating"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>
          <div class="grey--text ml-2"
            >{{ spot.rating }} ({{ spot.review_count }})</div
          >
        </v-row>
        <div class="my-0 subtitle-1">
          <span v-if="spot.price">
            {{ spot.price }}
            <v-icon x-small class="mr-1">mdi-square-small</v-icon>
          </span>
          <template v-for="cat in spot.categories">
            <v-chip
              :key="`${spot.id}-${cat.alias}`"
              x-small
              label
              class="mr-2 mb-0"
              >{{ cat.title }}</v-chip
            >
          </template>
        </div>
        <v-divider class="my-4"></v-divider>
        <div v-if="spot.display_phone" class="phone">
          <v-btn :href="`tel:${spot.phone}`" class="mr-3" icon tile link>
            <v-icon>mdi-phone</v-icon>
          </v-btn>
          <div class="phone__content">{{ spot.display_phone }}</div>
        </div>
        <div class="address">
          <v-btn
            :href="
              `https://maps.google.com/?q=${spot.location.display_address}`
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
            <div>{{ spot.location.address1 }}</div>
            <div>
              {{ spot.location.city }}, {{ spot.location.state }}
              {{ spot.location.zip_code }}
            </div>
          </div>
        </div>
      </v-card-text>
    </slot>
  </v-card>
</template>

<script>
import round from 'lodash/round'

export default {
  name: 'LunchSpot',
  filters: {
    distanceFormat(value) {
      return round(value, 2)
    },
  },
  props: {
    spot: {
      type: Object,
      required: true,
    },
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
