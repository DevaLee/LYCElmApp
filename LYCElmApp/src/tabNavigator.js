import React, {Component} from 'react'
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import * as views from './views'
import * as config from './config'
class AppTab extends Component {
    constructor(props){
        super(props)
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: null    
        }
    }

    render(){
        return (
            <Tab/>
        )
    }
}

const MsiteNav = createStackNavigator(
    {
        Msite : {screen : views.Msite}
    },
    {
        initialRouteName: 'Msite',
        navigationOptions:{
            headerStyle: {backgroundColor: config.THEME_BLUE_COLOR}
        }
    }
)

const OrderNav = createStackNavigator(
    {
        Order : {screen : views.Order}
    },
    {
        initialRouteName: 'Order',
        navigationOptions : {
            headerStyle: {backgroundColor: config.THEME_BLUE_COLOR}
        }
    }
)

const MineNav = createStackNavigator(
    {
        Mine : {screen : views.Mine}
    },
    {
        initialRouteName : 'Mine',
        navigationOptions : {
            headerStyle: {backgroundColor: config.THEME_BLUE_COLOR}
        }
    }

)

const Tab = createBottomTabNavigator(
    {
        Msite :  MsiteNav,
        Order : OrderNav,
        Mine :  MineNav 
    },
    {
        initialRouteName: 'Msite',
        tabBarOptions : 'bottom',
        lazy : true,
        headerMode : 'none',
        tabBarOptions: {
            activeTintColor : config.THEME_BLUE_COLOR,
            activeBackgroundColor : 'white',
            inactiveTintColor : config.THEME_FONT_COLOR,
            inactiveBackgroundColor : 'white',
            showIcon : true,
            showLabel : true,
            style: {backgroundColor : 'white', height: 49},
            tabStyle : {paddingTop : 2, paddingBottom: 0},
            labelStyle: {fontSize: 12, marginTop: 0, marginBottom: 5}
        }
    }
)

// Tab.navigationOptions = ({ navigation }) => {
//     const { routeName } = navigation.state.routes[navigation.state.index];
  
//     // You can do whatever you like here to pick the title based on the route name
//     const headerTitle = routeName;
  
//     return {
//       headerTitle,
//     };
//   };

export default AppTab





