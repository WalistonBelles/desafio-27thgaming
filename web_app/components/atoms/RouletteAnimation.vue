<template>
  <lottie-animation 
    path="./animations/roulette.json" 
    :loop="false"
    :speed="0.5"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
export default Vue.extend({
  components: {
    LottieAnimation
  },
})
</script>