import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {IN_DEBUGGER} from './config'
import reducers from './reducers'

const middlewares = [thunk];

if(IN_DEBUGGER){
    middlewares.push(createLogger({
        duration: true,
        collapsed: true,
    }))
}

const store = createStore(reducers, undefined, compose(
    applyMiddleware(...middlewares)
))

export default store