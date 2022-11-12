<template>
  <img src="~/assets/images/logo.png" class="logo" />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'LogoApp',

  data() {
    return {
      dialog: false
    }
  }
})
</script>