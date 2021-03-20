import axios from 'axios';
import router from '../../router'
import {Notify} from 'vant'
//默认配置
// let  baseURL = "http://192.168.13.242:8080/bf-portal/portal/"  //leahpi

let instance = axios.create({
  // baseURL: baseURL, 
  timeout: 60000,
  withCredentials: true,
  transformRequest: [
    data => {
      if(data instanceof FormData){
        data.append('fromAppId',13);
        data.append('platform','app');
        return data;
      }
      data.fromAppId = 13;
      data.platform ='app'
      data.platform = 'app';
      return JSON.stringify(data);
    }
  ]
});
//请求拦截器
instance.interceptors.request.use(
  config=>{
    //自动携带token
    let accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['accessToken'] = accessToken;
    }
    return config;
  }, 
  error =>{
    return Promise.reject(error);
  }
);
//响应拦截器
instance.interceptors.response.use(
  response => {
    let data = response.data;
    if (!data.success) {
      if(data.errCode == -5){
        console.error(-5,response)
        localStorage.removeItem('accessToken');
        router.app.$router.replace({name:'login'})
      }else if( data.errCode == -4){
        Notify({
          message: '服务器开小差了，请稍后再试',
          type: 'danger'
        });
      }else{
        //不是弹窗错误码
        if(data.errCode!=130300010){
          Notify({
            message: data.errDes,
            type: 'danger'
          }); 
        }
        
      }
    }
    return Promise.resolve(data);
  }, 
  error => {
    return Promise.reject(error.response)
  }
)
function getAjaxApi(config){
  let apiType =  config.apiType ? config.apiType : 'crm';
  let apiUrl = config.apiNum;
  if (apiType == 'az') {
    apiUrl = 'az/' + apiUrl;
  } else {
    apiUrl = 'sv/' + apiType + '/' + apiUrl;
  }
  return process.env.VUE_APP_REQUEST_URL + '/bf-portal/portal/' + apiUrl;
  // return 'http://192.168.16.172:88/' + apiUrl;
  // return 'http://192.168.13.217:8080/bf-portal/portal/' + apiUrl;
  // return 'http://192.168.13.242:8080/bf-portal/portal/' + apiUrl;
}
//ajax请求
const ajax = (config)=>{
    let url = getAjaxApi(config);
    return new Promise(function(resolve, reject) {
      instance({
        method: config.method ? config.method : 'POST',
        url: url,
        data: config.data,
        headers : {'Content-Type':'text/plain;charset=UTF-8','Accept':'application/json, text/javascript, */*'}
      }).then(
        response=>{
          resolve(response);
      }).catch(
        error=>{
          reject(error)
      })
    });
}

export default {
  ajax,
  axios
}; 