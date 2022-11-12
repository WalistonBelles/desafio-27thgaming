import {
  Module,
  VuexModule,
  Action
} from 'vuex-module-decorators'

import { $axios } from '~/utils/nuxt-instance'

@Module({
  name: 'bet',
  stateFactory: true,
  namespaced: true
})

export default class Bet extends VuexModule {
  @Action
  public async playBet(bet: string) {
    try {
      return await $axios.$get(`play/${bet}`)
        .then((response) => {
          if (response.code !== 'BET_SUCCESS') 
            throw new Error(response);

          return response;
        })
        .catch(({ response }) => {
          return response;
        });
    } catch(err) {
      return err;
    }
  }
}