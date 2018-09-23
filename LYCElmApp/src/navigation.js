import React, {Component}from 'react'
import {StackNavigator, TabNavigator} from 'react-navigation'
import * as views from './views'
import * as config from './config'


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
        initialRouteName: 'CityList',
        navigationOptions: {
            headerStyle: {backgroundColor: config.THEME_BLUE_COLOR}
        }
    }
)

export default AppNavigator