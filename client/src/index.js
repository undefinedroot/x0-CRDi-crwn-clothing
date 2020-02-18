import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

// access the store object, component as parent
import { Provider } from 'react-redux';

// get the created store
import mainStore from './redux/store'

// connect the persistance
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';

ReactDOM.render(
  <Provider store={mainStore.store}>
    <BrowserRouter>
      <PersistGate persistor={mainStore.persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
