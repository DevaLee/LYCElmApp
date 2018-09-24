/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, 
  NativeModules,StatusBar,NativeEventEmitter} from 'react-native';
import AppNavigator from './src/navigation'
import store from './src/store'
import {Provider} from 'react-redux'



export default class App extends Component {
  constructor(props){
    super(props);

  }

  

  render(){
    const RNAppModule = NativeModules.RNAppBridgeModule;
    RNAppModule.setAppStatusBarBackgroundColor();
    return (
      <Provider store = {store}>
        <View style={{flex : 1}}>
          <StatusBar barStyle='light-content'/>
          <AppNavigator/>
        </View>
      </Provider>
    )
  }

 

}



