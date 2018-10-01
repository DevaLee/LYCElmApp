import * as types from '../types'

function setCityName(cityName){

    return dispatch => {
        dispatch({type: types.SET_CITY_NAME, cityName});
    }
}

function setSelectedCityItem(selectedCityItem) {

    return dispatch => {
        dispatch({ type: types.SET_SELECTED_CITY_ITEM, selectedCityItem})
    }
}

export default {
    setCityName,
    setSelectedCityItem
}