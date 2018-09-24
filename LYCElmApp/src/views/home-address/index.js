import React, {Component} from 'react'
import {View, Text} from 'react-native'

class HomeAddress extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        const { navigation } = this.props;
        const cityItem = navigation.getParam('cityItem','');
        alert('homeAddress' + JSON.stringify(cityItem))
    }

    render(){
        return (<View>
            <Text>家地址</Text>
        </View>)
    }

}

export default HomeAddress;