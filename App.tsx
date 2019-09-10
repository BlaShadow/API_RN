import React from 'react';
import { Provider } from 'react-redux';

import AppContainer from './src/index';
import {store, persistor} from './src/store';

export default class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}