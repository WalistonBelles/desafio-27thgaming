<template>
  <v-row class="ma-0 pa-0 text-center">
    <v-text-field
      v-model="$auth.email"
      :rules="rules.email"
      label="Digite seu e-mail"
      type="email"
      validate-on-blur
      dense
      outlined
    ></v-text-field>

    <v-text-field
      v-model="$auth.password"
      label="Digite sua senha"
      :rules="rules.password"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      dense
      outlined
      @click:append="showPassword = !showPassword"
    ></v-text-field>

    <v-checkbox
      v-model="$auth.rememberMe"
      label="Mantenha-me conectado"
      class="mt-0"
      color="success"
      hide-details
    ></v-checkbox>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { auth } from '~/store'

export default Vue.extend({
  data() {
    return {
      rules: {
        email: [
          (v: string) => !!v || 'Campo obrigatório',
          (v: string) => /.+@.+\..+/.test(v) || 'O formato do e-mail não é válido.',
        ],
        password: [
          (v: string) => !!v || 'Campo obrigatório'
        ]
      },
      showPassword: false,
    }
  },

  computed: {
    $auth() {
      return auth.$credentials;
    }
  },
})
</script>
