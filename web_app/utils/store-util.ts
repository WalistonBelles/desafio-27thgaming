/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';

import Auth from '@/store/auth';
import Bet from '@/store/bet';

let auth: Auth;
let bet: Bet;

const initializeStores = (store: Store<any>) => {
  auth = getModule(Auth, store);
  bet = getModule(Bet, store);
};

export {
  initializeStores,
  auth,
  bet
};
