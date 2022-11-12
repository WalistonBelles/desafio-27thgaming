/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';

import Auth from '@/store/auth';

let auth: Auth;

const initializeStores = (store: Store<any>) => {
  auth = getModule(Auth, store);
};

export {
  initializeStores,
  auth
};
