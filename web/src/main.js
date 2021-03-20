console.log('%c 当前代码从git_dev拉取', 'color: green;');
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import _axios from './assets/js/_axios';
import moment from './assets/js/moment';
import _router from './assets/js/_router'
// import "@/components/me/index";
import vee_validate from "@/assets/js/vee-validate"; //校验
// vant ui 全引入
import Vant from 'vant';
import 'vant/lib/index.css';
import './assets/css/common.styl';
import './assets/css/color.styl';
import './assets/css/img.styl';
import Free from './assets/js/_free' 
import 'vant/lib/index.css';
import '../src/assets/js/_rem'
import { Toast } from 'vant';
Vue.use(Toast)
Vue.use(Free)
Vue.use(Vant)
Vue.config.productionTip = false
Vue.prototype.$axios = _axios
Vue.prototype.$moment = moment
_router.init()
// router.beforeEach((to, from, next) => {
//   if(from.name=='login'){
//     next();
//     return;
//   }
//   //如果页面需要登录
//   if(!localStorage.getItem('accessToken') && location.href.indexOf('login')==-1){
    
//       router.replace({
//         name:'login'
//       })
//       return;
//   }
//   next();
// });
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
