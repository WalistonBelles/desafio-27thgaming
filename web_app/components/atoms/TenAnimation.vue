<template>
  <lottie-animation path="./animations/10.json" />
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