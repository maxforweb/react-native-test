/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import UsersList from "./src/components/usersList"
import {createStore} from 'redux';
import reducer from './src/reducers/reducer.js';
import { Provider } from 'react-redux';
import Navigation from './src/routes/routeConfig.js'

const store = createStore(reducer);

const App: () => React$Node = () => {
  return (
    <>
        <Provider store = {store} >
            <Navigation />
        </Provider>
    </>
  );
};



export default App;
