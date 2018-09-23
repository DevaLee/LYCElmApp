import React,{Component} from 'react'
import {View,Text, TouchableHighlight,
ScrollView, StyleSheet,Image} from 'react-native'
import * as config from '../../config'
import { white } from 'ansi-colors';

class CityList extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: <HeaderLeft/>,
            headerRight: <HeaderRight/>
        }
    }

    render(){
        return (
            <ScrollView style={{flex:1}}>
                <View style= {[styles.city_current, styles.theme_border]}>
                    <Text style = {styles.city_current_Text}>当前定位城市</Text>
                    <Text style = {[styles.city_current_Text,{fontWeight:'bold',fontSize: 12}]}>定位不准时，请在城市列表中选择</Text>
                </View>
                <TouchableHighlight onPress = {() => {this._moreCity()}}>
                    <View style= {[styles.city_current, styles.theme_border]}>
                        <Text style={{color: config.THEME_BLUE_COLOR}}>上海</Text>
                        <Image source={require('../../../resource/system/right_arrow.png')} style = {{width: 20, height: 20}}/>
                    </View>
                </TouchableHighlight>
                <Text style= {[styles.city_hot_header,styles.theme_border]}>热门城市</Text>
            </ScrollView>
            
        )
    }
    _moreCity(){
        alert('moreCity')
    }
}

export default CityList

const styles = StyleSheet.create({
    theme_border:{
        borderBottomWidth:config.ONE_PIXEL, 
        borderBottomColor: config.THEME_BORDER_COLOR, 
    },

    city_current: {
        padding: 8,
        height: 40,
        alignItems:'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    city_current_Text: { 
        color : config.THEME_FONT_COLOR
    },
    city_hot_header: {
        marginTop: 10,
        backgroundColor: 'white',
        height: 30,
        lineHeight: 30,
        color: config.THEME_FONT_COLOR,
        paddingLeft: 8,
        fontSize: 15,
    }
})





class HeaderLeft extends Component {
    render(){
        return <Text style={{color:'white',fontSize:17, marginLeft: 8}}>ele.me</Text>
    }
}

class HeaderRight extends Component {

    render(){
        return <TouchableHighlight onPress = { () => this._loginRegisterClick()}>
            <Text style={{color: 'white', fontSize: 17,marginRight: 8}} >登录|注册</Text>
        </TouchableHighlight>
    }
    _loginRegisterClick(){
        alert('1')
    }
}