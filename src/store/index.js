import { init } from '@rematch/core';
import { register } from './register';
import { login } from './login';
import { forgot } from './forgot';
import { reset } from './reset';
import { user } from './user';
import { admin } from './admin';
import { buy } from './buy';
import { stock } from './stock';
const models = { register ,login,forgot,reset,user,admin,stock,buy};

const store = init({ models });

export default store;
