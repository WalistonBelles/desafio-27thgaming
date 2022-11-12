<template>
  <v-app>
    <v-app-bar
      color="white"
      clipped-left
      dense
      fixed
      app
    > 
      <MenuLogo />

      <v-spacer></v-spacer>

      <AccountMenu />
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LayoutDefault',
  middleware: 'auth',

  data () {
    return {
      drawer: true,
      mini_variant: true,
    }
  },

  methods: {
    changeMiniVariant(value: Boolean) {
      this.$set(this, 'mini_variant', value);
    },

    changeDrawer(value: Boolean) {
      this.$set(this, 'drawer', value);
    },
  }
})
</script>
