import React,{Component} from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../actions'


class Msite extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return <Text>msite</Text>
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