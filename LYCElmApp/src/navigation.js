import React, {Component}from 'react'

import {createStackNavigator, createBottomTabNavigator,TabNavigator} from 'react-navigation'
import * as views from './views'
import * as config from './config'
import AppTab from './tabNavigator'

class AppNavigator extends Component {

    constructor(props){
        super(props)

    }
    componentWillUnmount(){
        // this.locationListener.remove()
      }

    render(){
        return (<AppNav/>)
    }

}

const AppNav = createStackNavigator(
    {
        CityList : {screen : views.CityList},
        HomeAddress : {screen : views.HomeAddress},
        Tab : {screen : AppTab}
    },
    {
        initialRouteName: 'Tab',
        navigationOptions: {
            headerStyle: {backgroundColor: config.THEME_BLUE_COLOR},
            headerBackTitleStyle: {color: 'white'},
            headerTintColor: 'white'
        }
    }
)

export default AppNavigator


export function navToTab(navigation){
    navigation.navigate('Tab')
}