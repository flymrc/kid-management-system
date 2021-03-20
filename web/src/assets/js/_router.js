import router from '../../router'
import store from '../../store'
let routerEach = {
    isFirst : true,
    curPageName : '',
    async pageBefore(){
        await this.getToken();
        await this.getQrInfo();
        return await this.goPage()
    },
    init(){
        router.beforeEach((to, from, next) => {
            if(to.name=='login'){
                next()
                return;
            }
            if(to.meta.login && !localStorage.getItem('accessToken')){
                next({path :'/login'})
                return;
            }
            next();
        });
    }
}
export default routerEach