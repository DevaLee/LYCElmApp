import React, {Component}from 'react'

import {createStackNavigator, TabNavigator} from 'react-navigation'
import * as views from './views'
import * as config from './config'

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
        Msite: {screen : views.Msite}
    },
    {
        initialRouteName: 'HomeAddress',
        navigationOptions: {
            headerStyle: {backgroundColor: config.THEME_BLUE_COLOR},
            headerBackTitleStyle: {color: 'white'},
            headerTintColor: 'white'
        }
    }
)

export default AppNavigator