<template>
  <div class="login-container">
    <Logo class="logo"/>

    <v-form
      ref="form"
      v-model="valid"
      class="login-form text-center mt-4"
      @submit.prevent="validate"
      @keyup.native.enter="validate"
    >
    
    <v-alert
      v-if="error"
      dense
      outlined
      type="error"
      icon="mdi-alert-outline"
      transition="scale-transition"
    >
      E-mail ou senha inválidos.
    </v-alert>

    <LoginForm />

    <v-btn
      class="buttonBase mt-6"
      @click="validate"
    >
      Entrar
    </v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { auth } from '~/store';

export default Vue.extend({
  name: 'LoginOrganisms',

  data() {
    return {
      valid: true,
      error: false
    }
  },

  methods: {
    async onLogin() {
      try {
        const res = await auth.login(auth.$credentials);

        if (res.code !== 'LOGIN_SUCCESS') {
          this.$set(this, 'error', true);
        }

        else {
          this.$set(this, 'error', false);
          this.$router.replace('/');
        }
      } catch (error) {
        auth.setError();
      }
    },

    async validate(this: any) {
      await this.$refs.form.validate();
      
      if (this.valid)
        await this.onLogin();
    },
  }
})
</script>

<style scoped>
.login-form {
  width: 100%;
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
  left: 0;
  right: 0;
}

.buttonBase {
  text-transform: none;
  text-decoration: none;
  letter-spacing: normal;
  font-weight: 700;
  font-size: 14px;
  background-color: var(--primary) !important;
  color: var(--white);
  border-radius: 8px;
  width: 100%;
  height: 40px;
}

.buttonBase:hover {
  background-color: var(--secondary) !important;
  transition: 0.3s ease-in-out;
}

.v-btn--is-elevated,
.v-btn--is-elevated:after {
  box-shadow: none !important;
}
</style>