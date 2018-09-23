/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppNavigator from './src/navigation'
import store from './src/store'
import {Provider} from 'react-redux'

export default class App extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Provider store = {store}>
        <AppNavigator/>
      </Provider>
    )
  }

}



