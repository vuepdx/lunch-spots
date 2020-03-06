<template>
  <v-container v-if="spots.length" grid-list-xl>
    <v-layout row wrap>
      <v-flex v-for="(s, i) in spots" :key="s.id" xs12 md6>
        <v-card class="card mx-auto my-auto">
          <v-img :src="s.image_url" height="250"></v-img>
          <v-card-title>{{ s.name }}</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating :value="s.rating" color="amber" dense half-increments readonly size="14"></v-rating>
              <div class="grey--text ml-4">{{ s.rating }} ({{ s.review_count }})</div>
            </v-row>
            <div class="my-0 subtitle-1">
              <span v-if="s.price">
                {{ s.price }}
                <v-icon x-small class="mr-1">mdi-square-small</v-icon>
              </span>
              <template v-for="(cat) in s.categories">
                <v-chip :key="`${i}-${cat.alias}`" x-small label class="mr-2 mb-0">{{ cat.title }}</v-chip>
              </template>
            </div>
            <v-divider class="my-4"></v-divider>
            <div v-if="s.display_phone" class="phone">
              <v-btn :href="`tel:${s.phone}`" class="mr-3" icon tile link>
                <v-icon>mdi-phone</v-icon>
              </v-btn>
              <div class="phone__content">
                {{ s.display_phone }}
              </div>
            </div>
            <div class="address">
              <v-btn :href="`https://maps.google.com/?q=${s.location.display_address}`" target="_blank" class="mr-3" icon tile link>
                <v-icon>mdi-navigation</v-icon>
              </v-btn>
              <div class="address__content">
                <div v-for="(address, index) in s.location.display_address" :key="`address-${s.id}-${index}`">
                  {{ address }}
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: 'ResultList',
  props: {
    spots: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
