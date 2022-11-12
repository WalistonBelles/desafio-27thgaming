<template>
  <div>
    <lottie-animation v-if="number !== 10" :path="`./animations/${number}.json`" width="50%" :loop="false"/>

    <div v-else class="d-flex">
      <lottie-animation path="./animations/1.json" style="width: 150px; height: 150px;" :loop="false"/>
      <lottie-animation path="./animations/0.json" style="width: 150px; height: 150px;" :loop="false"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
export default Vue.extend({
  components: {
    LottieAnimation
  },

  props: {
    number: {
      type: Number,
      default: 0
    }
  }
})
</script>