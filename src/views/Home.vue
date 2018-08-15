<template>
  <v-card flat>
    <search-form></search-form>
    <v-container v-if="spots.length" grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12 md6 v-for="(s, i) in spots" :key="s.id">
          <v-card class="card elevation-3">
            <v-container fluid grid-list-sm>
              <v-layout row>
                <v-flex xs9>
                  <div>
                    <div class="title mb-2">{{s.name}}</div>
                    <template v-for="(cat, catIndex) in s.categories">
                      <v-chip small outline color="black" text-color="black" :class="{'ml-0': catIndex === 0}" :key="`${i}-${cat.alias}`">{{cat.title}}</v-chip>
                    </template>
                    <div v-if="s.display_phone" class="phone">
                      <v-icon class="mr-4">phone</v-icon>
                      <a :href="`tel:${s.phone}`" class="black--text">
                        {{s.display_phone}}
                      </a>
                    </div>
                    <div class="address">
                      <v-icon class="mr-3" medium>business</v-icon>
                      <a :href="`https://maps.google.com/?q=${s.location.display_address}`" class="black--text" target="_blank">
                        <div v-for="(address, index) in s.location.display_address" :key="`address-${s.id}-${index}`">
                          {{address}}
                        </div>
                      </a>
                    </div>
                    <!-- <pre>{{s}}</pre> -->
                  </div>
                </v-flex>
                <v-flex xs3>
                  <v-card-media :src="s.image_url" height="150px" contain></v-card-media>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'spots'
    ])
  },
  methods: {}
}
</script>
<style scoped>
.card {
  height: 100%;
}

.address,
.phone {
  display: flex;
  margin-top: 0.5rem;
}
</style>
