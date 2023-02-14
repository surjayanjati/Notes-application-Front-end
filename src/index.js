import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";

// Importing The Store From The Store File
import store from './Store';

// Importing The Prvoider From react-Redux To wrap The Entire App
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Provider store={store}>
    <App />
    </Provider>

);


