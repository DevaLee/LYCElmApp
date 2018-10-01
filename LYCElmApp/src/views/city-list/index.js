import React,{Component} from 'react'
import {View,Text, TouchableOpacity,
ScrollView, StyleSheet, Image, 
NativeModules, NativeEventEmitter,DeviceEventEmitter} from 'react-native'

import * as config from '../../config'
import apis from '../../apis'
import * as actions from '../../actions'


// iOS 本地导出的模块
const RNNotificationModule = NativeModules.RNNotificationBridgeModule;
// OC通知衔接JS通知
const LYCRNEvent = new NativeEventEmitter(RNNotificationModule);

class CityList extends Component {

    constructor(props){
        super(props)
        this.state = {
            hotCityArray : [],
            groupCityObject: {}
        }
        this.locationListener = LYCRNEvent.addListener('ReactLocationSuccess',this._locationSuccess)
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: <HeaderLeft/>,
            headerRight: <HeaderRight/>
        }
    }
   
    componentWillMount(){
        this._getHotCity()
        this._getGroupCity()


    }

    render(){
        let hotCityView = this.state.hotCityArray.map((cityInfo, i) => (
            <TouchableOpacity style= {styles.city_name} key= {i} 
                onPress = {()=>{this._selectCity(cityInfo)}}    
            >
                <Text style= {styles.city_name_text}>{cityInfo.name}</Text>
            </TouchableOpacity>
        ))

        let groupCityView = Object.keys(this.state.groupCityObject).map((itemKey,i) => (
            <View  key= {'alpha' + itemKey}>
                <View>
                    <View style= {styles.city_group_header}>
                        <Text style= {{lineHeight: 14}} >{itemKey}</Text>
                        {i === 0 ? <Text style= {styles.city_header_text}>(按字母顺序)</Text> : null}
                    </View>
                    <View style= {styles.city_list}>
                        {this.state.groupCityObject[itemKey].map((item, itemKey) =>(
                            <TouchableOpacity style= {styles.city_name} key= {'groupCity' + item.name + itemKey}
                                onPress= {() => {this._selectCity(item)}}
                            >
                                <Text style= {[styles.city_name_text,{color: config.THEME_FONT_COLOR}]}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>    
            </View>
        ))

        return (
            <ScrollView style={{flex:1}}>
                <View style= {[styles.city_current, styles.theme_border]}>
                    <Text style = {styles.city_current_Text}>当前定位城市</Text>
                    <Text style = {[styles.city_current_Text,{fontWeight:'bold',fontSize: 12}]}>定位不准时，请在城市列表中选择</Text>
                </View>
                <TouchableOpacity onPress = {() => {}}>
                    <View style= {[styles.city_current, styles.theme_border]}>
                        <Text style={{color: config.THEME_BLUE_COLOR}}>{this.state.City ? this.state.City : '北京市'}</Text>
                        <Image source={require('../../../resource/system/right_arrow.png')} style = {{width: 20, height: 20}}/>
                    </View>
                </TouchableOpacity>
                <Text style= {[styles.city_hot_header,styles.theme_border]}>热门城市</Text>
                <View style= {styles.city_list}>
                    {hotCityView}
                </View>
                {groupCityView}
            </ScrollView>
            
        )
    }
    
    /****************************点击事件*************************/
    _selectCity(cityItem){
        this.props.navigation.navigate('HomeAddress',{'cityItem': cityItem})
    }

    /*****************************网络***************************/ 
    // 热门城市
    async _getHotCity(){
        let params = {'type' : 'hot'};
        let res = await apis.getCities(params);
        this.setState({
            hotCityArray : res
        })
    }
    // 全部城市
    async _getGroupCity(){
        let params = {'type' : 'group'}
        let res = await apis.getCities(params);
        this._sortgroupcity(res)      
    }
    /***************************工具*******************************/
    // 工具
    _sortgroupcity(groupCityArray){
        let sortobj = {};
        for (let i = 65; i <= 90; i++) {
            if (groupCityArray[String.fromCharCode(i)]) {
                sortobj[String.fromCharCode(i)] = groupCityArray[String.fromCharCode(i)];
            }
        }
        this.setState({
            groupCityObject : sortobj
        })
    }

    _locationSuccess = (locationInfo) => {
        this.setState({
            City: locationInfo.City
        })
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
    },
    city_name: {
        width : config.SCREEN_WIDTH * 0.25,
        borderWidth: config.ONE_PIXEL, 
        borderColor: config.THEME_BORDER_COLOR,
        height: config.SCREEN_WIDTH * 0.25 * 0.4
    },
    city_name_text: {
        textAlign: "center",
        color: config.THEME_BLUE_COLOR, 
        fontSize: 15,
        lineHeight: config.SCREEN_WIDTH * 0.25 * 0.4,
    },
    city_list: {
        backgroundColor: 'white',
        flexDirection: 'row',
        flexWrap:'wrap'
    },
    city_group_header: {
        flexDirection: 'row',
        height: 30, 
        padding: 8, 
        backgroundColor: 'white',marginTop: 10
    },
    city_header_text: {
        lineHeight : 14, 
        fontSize: 12, 
        color: config.SECOND_FONT_COLOR, 
        marginLeft: 8
    }
    
})


class HeaderLeft extends Component {
    render(){
        return <Text style={{color:'white',fontSize:17, marginLeft: 8}}>ele.me</Text>
    }
}

class HeaderRight extends Component {

    render(){
        return <TouchableOpacity onPress = { () => this._loginRegisterClick()}>
            <Text style={{color: 'white', fontSize: 17,marginRight: 8}} >登录|注册</Text>
        </TouchableOpacity>
    }
    _loginRegisterClick(){
        alert('1')
    }
}