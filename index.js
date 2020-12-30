import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider as ReduxProvider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import store from './src/store';

const Root = () => (
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>
);

AppRegistry.registerComponent(appName, () => Root);
