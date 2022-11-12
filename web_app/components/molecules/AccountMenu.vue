<template>
  <v-menu
    bottom
    offset-y
  >
    <template #activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on" >
        <v-avatar color="blue-grey" size="38">
          <DefaultAvatar
            v-if="getPhoto" 
            :photo_url="getPhoto"
            :alt="getUsername"
          />
          <div v-else class="white--text text-h5"> {{ getUsername[0] }} </div>
        </v-avatar>
      </span>
    </template> 

    <v-list>
      <v-list-item>
        <v-list-item-title 
          class="account-menu-items cursor-pointer"
          @click="onLogout"
        > 
          <v-icon>
            mdi-logout
          </v-icon>
          Sair 
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import { auth } from '@/store'

export default Vue.extend({
  computed: {
    getUsername() {
      return this.$cookies.get('username');
    },
    
    getPhoto() {
      if (this.$cookies.get('photo'))
        return this.$cookies.get('photo')
      return "";
    }
  },

  methods: {
    async onLogout() {
      await auth.destroy();

      this.$router.replace('/login');
    },
  }  
})
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>