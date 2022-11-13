<template>
  <v-form
    ref="form"
    v-model="valid"
    class="bet-form text-center mt-4"
    @submit.prevent="validate"
    @keyup.native.enter="validate"
  >
    <v-row class="ma-0 pa-0 text-center">
      <v-autocomplete
        :value="$bet"
        :rules="required"
        :items="betOptions"
        label="Digite sua aposta"
        type="text"
        validate-on-blur
        dense
        outlined
        @change="($event) => setBetType($event)"
      />
    </v-row>

    <v-btn @click="validate">
      Apostar
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { bet } from '~/store'

export default Vue.extend({
  data() {
    return {
      valid: true,
      betOptions: ['odd', 'even', 'low', 'high', 'red', 'black'],
      required: [
        (v: string) => !!v || 'Campo obrigatório'
      ],
      showPassword: false,
    }
  },

  computed: {
    $bet() {
      return bet.$betType;
    }
  },

  methods: {
    async validate(this: any) {
      await this.$refs.form.validate();
      
      if (this.valid)
        this.$emit('action');
    },

    setBetType(betType: String) {
      bet.setBetType(betType);
    }
  }
})
</script>
