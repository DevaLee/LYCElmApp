import React, {Component}from 'react'
import {StackNavigator, TabNavigator} from 'react-navigation'
import * as views from './views'


class AppNavigator extends Component {

    render(){
        return (<AppNav/>)
    }
}

const AppNav = StackNavigator(
    {
        CityList : {screen : views.CityList}
    },
    {
        initialRouteName: 'CityList'
    }
)

export default AppNavigator