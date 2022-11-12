import {
  Module,
  VuexModule,
  Mutation,
  Action
} from 'vuex-module-decorators'

import { $axios, $cookies } from '@/utils/nuxt-instance'
interface LoginPayload {
  email: string
  password: string,
  rememberMe: boolean
}

interface UpdatePayload {
  token?: string,
  permission?: Object[],
  roles?: Object[],
}

type Token = string | null;
@Module({
  name: 'auth',
  stateFactory: true,
  namespaced: true
})

export default class Auth extends VuexModule {
  private isError = false;
  private credentials: LoginPayload = {
    email: "",
    password: "",
    rememberMe: false 
  };

  private token = {} as Token;

  public get $token() {
    return this.token;
  }

  public get $credentials() {
    return this.credentials;
  }

  public get $statusError() {
    return this.isError;
  }

  @Mutation
  private UPDATE_TOKEN(token: Token) {
    this.token = token;
  }

  @Mutation
  private SET_ERROR() {
    this.isError = true;
  }

  @Mutation
  private REMOVE_ERROR() {
    this.isError = false;
  }

  @Action
  public async login(payload: LoginPayload) {
    return await $axios.$post('login', payload)
      .then(( response ) => {
        if (response.code !== 'LOGIN_SUCCESS') 
          throw new Error(response);

        const age = payload.rememberMe ? 60 * 60 * 24 * 7 : 60 * 60;

        $cookies.set('token', response.result.token, {
          path: '/',
          maxAge: age
        });

        $cookies.set('username', response.result.payload.name, {
          path: '/',
          maxAge: age
        });

        this.context.commit('UPDATE_TOKEN', response.result.token);

        return response;
      })
      .catch(({ response }) => {
        return response;
      })
  }

  @Action
  public update(payload: UpdatePayload) {
    const token = payload?.token ? payload.token : $cookies.get('token');

    this.context.commit('UPDATE_TOKEN', token || null);
  }

  @Action
  async destroy() {
    await $axios.get('logout');

    $cookies.removeAll();

    this.context.commit('UPDATE_TOKEN', null);
  }

  @Action
  public setError() {
    this.context.commit('SET_ERROR');
  }

  @Action
  public removeError() {
    this.context.commit('REMOVE_ERROR');
  }
}
