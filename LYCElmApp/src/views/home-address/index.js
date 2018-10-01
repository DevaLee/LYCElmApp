import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput,
StyleSheet,FlatList, AsyncStorage} from 'react-native'
import * as config from '../../config'
import apis from '../../apis'
import * as actions from '../../actions'
import store from '../../store'
class HomeAddress extends Component {
    constructor(props){
        super(props);
    }
    state= {
        shoplist : [],
        historyList: [],
        showHistory: true,
        searchText: '上海'
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('cityItem','').name,
            headerRight: (<TouchableOpacity style= {{marginRight: 8}} onPress = {navigation.getParam('exchangeCity')}>
                <Text style= {{color: 'white'}}>切换城市</Text>
            </TouchableOpacity>)
        }
    }

    //type=search&city_id=' + params.cityId + '&keyword=' + params.keyword
    componentWillMount(){
        const { navigation } = this.props;
        navigation.setParams({exchangeCity: this._exchangeCity}) 
        this.getHistoryList()        
    }

    async getHistoryList(){
        // 返回的是string
        const history  =  await  AsyncStorage.getItem('historyList')
        const historyArray = JSON.parse(history)
        if(Array.isArray(historyArray)){
            this.setState({
                shoplist: historyArray
            })
        }    
    }

    render(){
        return (<View style={{flex: 1}}>
            <View style= {styles.header_input}>
                <View style= {styles.header_input_border}>
                    <TextInput placeholder='输入学校、商务楼、地址' style= {{paddingLeft: 5,height: 30}} 
                        onChangeText = {(searchText)=> {this.setState({searchText})}}
                    />    
                </View>
                <TouchableOpacity style= {styles.header_search_button}
                    onPress = {this._searchCity}
                >
                    <Text style={{color: 'white',lineHeight: 30, fontSize: 15}}>提交</Text>
                </TouchableOpacity>
            </View>
            {this.state.showHistory ? <Text style={styles.search_history_text}>搜索历史</Text> : null}
            <FlatList ListFooterComponent = {this._renderFooterComponent()} 
                data= {this.state.shoplist}
                renderItem = {this._renderItem}
                style= {{backgroundColor: 'white'}}
            ></FlatList>
        </View>)
    }

    _exchangeCity = () => {
        this.props.navigation.goBack();
    }
    _clearData = () => {
        AsyncStorage.clear();
        this.setState({
            shoplist: []
        })
    }
    _searchCity = () => {
        this._requestShopList()
    }
    async _selectItem (shopItem) {
        const history = await AsyncStorage.getItem('historyList');
        const historyList = JSON.parse(history)
        if(history === null){
            let array = [];
            array.push(shopItem)
            AsyncStorage.setItem('historyList', JSON.stringify(array))
        }else if(Array.isArray(historyList)) {
            historyList.push(shopItem)
            AsyncStorage.setItem('historyList', JSON.stringify(historyList))
        }else {
            
        }

        store.dispatch(actions.app.setSelectedCityItem(shopItem))
        const {navigation} = this.props;
        navigation.navigate('Tab')
    }

    _renderFooterComponent(){
        return (
            this.state.showHistory ? <TouchableOpacity style={{alignItems: 'center'}} onPress = {this._clearData}>
            <Text style={{height: 30,lineHeight: 30}}>清空所有</Text>
        </TouchableOpacity> : null            
        )
    }

    _renderItem=({item})=>{
        return(<TouchableOpacity style= {styles.shop_item} key= {item.geohash}
            onPress = {()=>this._selectItem(item)}
        >
            <View>
                <Text style= {{marginBottom: 15}}>{item.name}</Text>
                <Text style= {{color: config.THEME_FONT_COLOR, fontSize:12}}>{item.address}</Text>
            </View>

        </TouchableOpacity>)
        
    }
    async _requestShopList(){
        // let { navigation } = this.props;
        // const cityItem = navigation.getParam('cityItem','');
        let params = {
            'type': 'search',
            'cityId': '1',
            'keyword': this.state.searchText
            }
        let res = await apis.getSearchAddressList(params)
        this.setState({
            shoplist: res,
            showHistory: false
        })
    }

}

export default HomeAddress;

const styles = StyleSheet.create({

    header_input:{
        marginTop: 8,
        marginBottom: 8, 
        padding: 8,
        paddingLeft: 15, 
        paddingRight: 15,

        backgroundColor : 'white',
        borderBottomWidth: config.ONE_PIXEL,
        borderBottomColor: config.THEME_BORDER_COLOR
    },
    header_search_button: {
        height: 30, 
        borderRadius: 2, 
        marginTop: 8, 
        alignItems: 'center',
        backgroundColor:config.THEME_BLUE_COLOR,
    },
    header_input_border: {
        borderRadius:2,
        borderWidth:config.ONE_PIXEL,
        borderColor:config.THEME_BORDER_COLOR,
    },
    search_history_text: {
        fontSize: 12, 
        marginBottom:4, 
        marginLeft: 8,
        color: config.THEME_FONT_COLOR
    },
    shop_item: {
        padding: 15,
        borderBottomWidth:config.ONE_PIXEL, 
        borderBottomColor: config.THEME_BORDER_COLOR, 
    }
})