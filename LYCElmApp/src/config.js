import { Dimensions } from 'react-native'

export const DEBUG = __DEV__
export const IN_DEBUGGER = DEBUG && !!window.navigator.userAgent
export const VERSION = '1.0.0'
let {width, height} = Dimensions.get('window')

export const SCREEN_WIDTH = width
export const SCREEN_HEIGHT = height
export const STATUS_BAR_HEIGHT = 20
export const NAV_BAR_HEIGHT = 64
export const TAB_BAR_HEIGHT = 44

export const ENVS = {
    production : {
        base_url : ''
    }
}