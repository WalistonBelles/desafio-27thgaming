<template>
  <v-row class="bet-container ma-0">
    <v-col class="ma-0 pa-0" cols="12">
      <RouletteForm @action="onAction"/>
    </v-col>
    <v-col class="ma-0 pa-0" cols="12">
      <RouletteAnimation v-if="isLoading" style="width: 50% !important"/>
      <NumberAnimation v-if="isFinished" :number="numberResult" />
    </v-col>    
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { bet } from '~/store';

export default Vue.extend({
  name: 'BetOrganisms',

  data() {
    return {
      error: false,
      isFinished: false,
      isLoading: false,
      numberResult: 0
    }
  },

  methods: {
    async onAction() {
      this.$set(this, 'isLoading', true);
      this.$set(this, 'isFinished', false);

      const res = await bet.playBet(bet.$betType);
      
      setTimeout(() => {
        if (res.code === 'BET_SUCCESS') {
          this.$set(this, 'isFinished', true);
          this.$set(this, 'numberResult', res.result.roll.number);
        }

        else {
          this.$set(this, 'error', true);
        }
        this.$set(this, 'isLoading', false);
      }, 2000);
    },
  }
})
</script>

<style scoped>
.bet-container {
  width: 250px;
}

.bet-form {
  width: 100%;
}
</style>