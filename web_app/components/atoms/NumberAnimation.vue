<template>
  <div>
    <lottie-animation v-if="number < 10" :path="`./animations/${number}.json`" style="width: 150px; height: 150px;" :loop="false"/>

    <div v-else class="d-flex">
      <lottie-animation :path="`./animations/${getFirstNumber(number)}.json`" style="width: 150px; height: 150px;" :loop="false"/>
      <lottie-animation :path="`./animations/${getSecondNumber(number)}.json`" style="width: 150px; height: 150px;" :loop="false"/>
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
  },

  methods: {
    getFirstNumber(number: Number) {
      const value = number.toString().split('');
      return value[0];
    },
    getSecondNumber(number: Number) {
      const value = number.toString().split('');
      return value[1];
    },
  }
})
</script>