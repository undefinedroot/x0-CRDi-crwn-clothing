// root reducer combines all other reducers

import { combineReducers } from 'redux';

// we persist our store, we need to persist our reducers
import { persistReducer } from 'redux-persist';

// get window.localStorage
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

// whitelist: names of the reducers you need to store
// in this case, we just need 'cart', because 'user'
// is being handled by firebase
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'directory', 'shop']
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

// pass the persistConfig and the rootReducer
export default persistReducer(persistConfig, rootReducer);