import { Dimensions, PixelRatio } from 'react-native'

export const DEBUG = __DEV__
export const IN_DEBUGGER = DEBUG && !!window.navigator.userAgent
export const VERSION = '1.0.0'
let {width, height} = Dimensions.get('window')

export const SCREEN_WIDTH = width
export const SCREEN_HEIGHT = height
export const STATUS_BAR_HEIGHT = 20
export const NAV_BAR_HEIGHT = 64
export const TAB_BAR_HEIGHT = 44



let screenScale = PixelRatio.get();
export const ONE_PIXEL = 1 / screenScale; 

const defaultPixel = 2;
const w2 = (750 / defaultPixel);
const h2 = (1334 / defaultPixel);

export function autoWidth(num){
    return num / w2 * width
}
export function autoHeight(num){
    return num / h2 * height
}



export const ENVS = {
    production : {
        base_url : 'https://elm.cangdu.org/'
    }
}



// colors 
export const THEME_BLUE_COLOR = '#3190e8' // 49,144,232
export const THEME_BORDER_COLOR = '#e4e4e4' // 228,228,228
export const THEME_FONT_COLOR = '#858585' // 133 
export const SECOND_FONT_COLOR = '#b4b4b4' // 180
// url 参数拼接
export const stringByAppendParams = (params) =>{
    if(typeof param === 'object'){
        let paramstr = ""
        let keysArray = Object.keys(param)
        keysArray.forEach(item => {
            let key = item
            let value = param[key]
            if(value.length === 0){
                value = '';
            }
            paramstr = paramstr + item + '=' + value + '&'
        
        })

        return paramstr.substring(0,substring.length - 1);
    }
    return param;
}
