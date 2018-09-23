import * as types from '../types'

function setCityName(cityName){

    return dispatch => {
        dispatch({type: types.SET_CITY_NAME, cityName});
    }
}

export default {
    setCityName
}