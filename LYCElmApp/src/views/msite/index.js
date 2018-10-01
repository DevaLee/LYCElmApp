import React,{Component} from 'react'
import {View, Text, TouchableOpacity, 
    Image, TextInput, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../actions'
import * as config from '../../config'


class Msite extends Component {
    constructor(props){
        super(props)
    }

    static navigationOptions = ( {navigation} ) => {
        return {
            headerTitle : (navigation.getParam('showSearchHeader') ? null : navigation.getParam('shopName')),
            headerTintColor : 'white',
            headerRight: (
                navigation.getParam('showSearchHeader') ? 
                    <TouchableOpacity style= {{marginRight : 15}} onPress= {navigation.getParam('searchAction')}>
                        <Text style={{color : 'white',fontSize: 14}}>搜索</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style= {{marginRight : 15}}>
                        <Text style= {{color: 'white',fontSize: 18 }}>登录|注册</Text>
                    </TouchableOpacity>
                 
            ),
            headerLeft : (
                navigation.getParam('showSearchHeader') ? 
                <SearchLeft backAction={navigation.getParam('searchBack')}
                searchTextChange = {navigation.getParam('onChangeText')}
                /> :
                <TouchableOpacity style= {{marginLeft : 15}} onPress= {navigation.getParam('beforeSearch')}>
                    <Image  source= {require('../../../resource/system/search.png')}
                        style={{width: 25, height: 25}}
                    ></Image>
                </TouchableOpacity> 
            )
            
        }
    }

    componentWillMount(){
        let {app} = this.props;
        let shopName = app.selectedCityItem.name;
        this.props.navigation.setParams({
            shopName,
            'showSearchHeader' : false,
            'beforeSearch': this._beforeSearch,
            'searchAction' : this._searchAction,
            'searchBack': this._searchBack,
            'onChangeText' : this._onChangeText
        })
    }

    render(){
        return <Text>msite</Text>
    }

    _beforeSearch = () => {
        let {navigation} = this.props;
        navigation.setParams({'showSearchHeader' : true})
    }
    _searchAction = () => {
        alert(this.state.searchText)
    }
    _searchBack = () => {
        this.props.navigation.setParams({'showSearchHeader' : false})
    }
    _onChangeText = (text) => {
        //alert(text)
        this.setState({
            'searchText':text
        })
    }
}

function mapStateToProps(state){
    let { app } = state;
    return {
        app
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Msite)



class SearchLeft extends Component {
    constructor(props){
        super(props)
    }
 
    render(){
        return <View style={{flexDirection:'row',marginLeft : 15}}>
            <TouchableOpacity onPress={this.props.backAction}>
                <Image style= {{width: 25, height: 25}}
                source= {require('../../../resource/system/left_arrow.png')}/>
            </TouchableOpacity>

            <View style= {styles.inputBorder}>
                <TextInput style={styles.input} placeholder= '请输入商家或美食名称'
                    onChangeText= {this.props.searchTextChange}
                />
            </View>
        </View>
        
        //<Text>左边</Text>
    }
}

const styles = StyleSheet.create({
    inputBorder : {
        borderColor: config.THEME_BORDER_COLOR,
        borderWidth: config.ONE_PIXEL,
        borderRadius: 4,
        backgroundColor: 'white'   
    },
    input : {
        paddingLeft: 8,
        height : 25,
        lineHeight : 25, 
        width: config.SCREEN_WIDTH - 40 - 15 - 40
    }
})