import axios from './_axios.js';
import store from '../../store'
let _free = {}
let _ticket;
let _latitude;
let _longitude;
var wx = require('weixin-js-sdk');
//获取微信凭证
function getWxTicket(getLocationCount){
    return new Promise((resolve,reject)=>{
        if(!_free.isWx()){
            resolve();
            return;
        }
        let localTicket = _free.getLocal('ticket')
        if(localTicket){
            _ticket = localTicket
            console.log("_ticket有缓存",_ticket)
            resolve()
            return;
        }
        console.log("从接口获取ticket")
        axios.ajax({
            apiType: "bds",
            apiNum: "70600001",
            data: {
                url:(getLocationCount%2==0) ? _free.getLocal('firstUrl') : location.href.split('#')[0]
                // url:location.href.split('#')[0]
            }
        })
        .then((res) => {
            if (res.success) {
                
                _ticket = res.result;
                _free.setLocal('ticket',_ticket)
                console.log("接口获取ticket成功并缓存")
                resolve()
            }else{
                console.error("接口获取ticket失败")
                reject();
            }
        });
    })
}
//设置微信配置
function _setWxConfig(){
    wx.config({
        debug: false, // 因为在手机上测试没法打印，当debug为true时，所有的返回值都会在手机上alert出来
        appId: _ticket.appId, // 必填，公众号唯一标识
        timestamp: _ticket.timestamp, // 必填，生成签名的时间戳
        nonceStr: _ticket.nonceStr, // 必填，生成签名的随机串
        signature: _ticket.signature,// 必填，签名
        jsApiList: ['openLocation','getLocation'] // 必填，需要使用的JS接口列表，需要用到什么接口就去开发者文档查看相应的字段名
    });
}
//获取微信定位
function getWxPosition(){
    return new Promise((resolve,reject)=>{
        if(!_free.isWx()){
            // 121.490659,31.231563  上海市黄浦区四川南路27号附近
            //'121.408858,31.171445 上海市徐汇区虹梅路街道宜州路华鑫天地
            _longitude = '121.409267';_latitude = '31.169742'; //上海徐汇区
            // _longitude = '120.962011';_latitude = '31.382849'; //江苏省苏州市昆山市
            // _longitude = '117.196729';_latitude = '39.118321'; //天津市和平区
            // _longitude = '103.858726';_latitude = '36.045302'; //甘肃省兰州市城关区天水南路222号
            resolve();
            return;
        }
        _setWxConfig();
        wx.error(function(res){
            console.log('wx.error',res)
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
        let getLocationCount = 0;
        function getLocation(){
            if(getLocationCount>0){
                _setWxConfig()
            }
            
            wx.getLocation({
                type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    console.log('wx.getLocation.success',res)
                    _latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    _longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    resolve()
                },
                cancel: function (err) {
                    console.error('wx.getLocation.cancel',err)
                    reject()
                },
                //定位失败
                fail: function (err) {
                    console.error('wx.getLocation.fail',err)
                    console.error('获取定位失败，清除ticket缓存')
                    _free.setLocal('ticket','')
                    if(getLocationCount>=3){
                        console.error('获取定位3次都失败')
                        reject();
                        return;
                    }
                    getLocationCount++;
                    console.log('重新获取定位'+ getLocationCount +'次')
                    getWxTicket(getLocationCount).then(()=>{
                        getLocation()
                    }).catch(()=>{
                        reject()
                    })
                }
            });
        }
        if(store.state.wx){
            console.log('getLocation-ready')
            getLocation()
        }else{
            console.log('getLocation-no-ready')
            wx.ready(function(){
                console.log('getLocation-ready')
                store.state.wx = true
                getLocation()
            });
        }
        
    })
}
function getAddress(){
    return new Promise((resolve,reject)=>{
        axios.ajax({
            apiType: 'bds',
            apiNum: 70600003,                    
            data:  {'longitude':_longitude,'latitude':_latitude}
            }).then((res)=>{
                let address = res.result.regeocode.formatted_address;
                let province = res.result.regeocode.addressComponent.province//省
                let city = res.result.regeocode.addressComponent.city//市
                let district = res.result.regeocode.addressComponent.district//区
                let address2 = address.substring(address.indexOf(district)+district.length);
                
                resolve({
                    latitude : _latitude,
                    longitude : _longitude,
                    address:address,
                    address2:address2,
                    province:province,
                    district:district,
                    city:city
                })
        });
    })
}
async function init(){
    await getWxTicket(0);
    await getWxPosition();
    return await getAddress();
}
function getPos(){
    _free = this
    console.log('getPos')
    
    return init()
    
}
export {getPos}