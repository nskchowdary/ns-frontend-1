import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
import './assets/scss/main.scss';
root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);

serviceWorkerRegistration.register();
reportWebVitals();
