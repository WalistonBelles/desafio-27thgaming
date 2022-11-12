<template>
  <div class="bet-container">
    <v-form
      ref="form"
      v-model="valid"
      class="text-center mt-4"
      @submit.prevent="validate"
      @keyup.native.enter="validate"
    >
      <RouletteAnimation style="width: 50% !important"/>
      
      <NumberAnimation :number="10" width="50%" />

      <v-btn
        class="buttonBase mt-6"
        @click="validate"
      >
        Apostar
      </v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { bet } from '~/store';

export default Vue.extend({
  name: 'BetOrganisms',

  data() {
    return {
      valid: true,
      error: false,
      betOption: 'even'
    }
  },

  methods: {
    async onAction() {
      const res = await bet.playBet(this.betOption);

      if (res.code !== 'BET_SUCCESS') {
        this.$set(this, 'error', true);
      }

      else {
        this.$set(this, 'error', false);
      }
    },

    async validate(this: any) {
      await this.$refs.form.validate();
      
      if (this.valid)
        await this.onAction();
    },
  }
})
</script>