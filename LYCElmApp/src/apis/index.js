import axios from 'axios'
import Toast from 'react-native-root-toast'
import {ENVS, stringByAppendParams} from '../config'


axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'; //请求头
axios.defaults.headers.Accept = 'application/json'; //请求头
axios.defaults.baseURL = ENVS['production'].base_url;
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
    return config;
}, (error) => {
    Toast.show('参数错误',{
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER
    })
    return Promise.reject(error);
})

axios.interceptors.response.use((res)=>{
    if(!res.data){
        return Promise.reject(res);
    }
    return res.data;
}, (error)=> {
    Toast.show('网络错误',{
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER
    })
    return Promise.reject(error)
})

export default {
    // guess hot group
    getCities(params){
        return axios.get('/v1/cities?' + stringByAppendParams(params))
    },
    getSearchAddressList(params){
        return axios.get('/v1/pois?' + stringByAppendParams(params))
    }
}