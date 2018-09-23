import * as types from '../types'

const initialState = {
    cityName : ''
}

export default (state = initialState, action) => {
    switch(action.type){
        case types.SET_CITY_NAME:
            let { cityName } = action;
            return {
                ...state,
                cityName
            }
        default :{
            return state;
        } 
    }
}