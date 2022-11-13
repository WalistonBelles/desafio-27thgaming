import {
  Module,
  VuexModule,
  Action,
  Mutation
} from 'vuex-module-decorators'

import { $axios } from '~/utils/nuxt-instance'

@Module({
  name: 'bet',
  stateFactory: true,
  namespaced: true
})

export default class Bet extends VuexModule {
  private betType: String = undefined

  public get $betType() {
    return this.betType
  }

  @Mutation
  private SET_BET_TYPE(betType: String) {
    this.betType = betType;
  }

  @Action
  public async playBet(bet: String) {
    try {
      return await $axios.$get(`bet/play/${bet}`)
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

  @Action
  public setBetType(betType: String) {
    this.context.commit('SET_BET_TYPE', betType);
  }
}