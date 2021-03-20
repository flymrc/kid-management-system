

import axios from './_axios.js';
import router from '../../router'
import {getPos} from './_free_getPos'
console.log(getPos)
import {Toast } from 'vant'
let Free = {}
function deepClone(obj,otherAuth) {
    let me_user_fn = this.getLocal('me_user_fn');
    let me_user_auth = this.getLocal('me_user_auth');
    var newobj = obj instanceof Array ? [] : {};
    let isArray = obj instanceof Array;
    let deleteCount = 0;
    // 1.for...in进入循环
    for (var k in obj) {
      //2.判断对象的第一个属性是否为数组或者对象，如果是，则进入递归
      let elem = obj[k]
      if (obj[k] instanceof Array) {
        newobj[k] = this.deepClone(obj[k],otherAuth)
      } 
      else if (obj[k] instanceof Object) {
        let isShow = true;
        if(!elem.hasAuth){
            //业务权限
            if(this.isFilter  && obj[k].businessFieldId){
                if(me_user_auth.indexOf(Number(obj[k].businessFieldId))==-1){
                    if(elem.functionId=='702'){console.log('业务权限')}
                    deleteCount++
                    isShow = false
                }
            }
            //操作权限
            if(this.isFilter && obj[k].functionId){
                if(me_user_fn.indexOf(Number(obj[k].functionId))==-1){
                    if(elem.functionId=='702'){console.log('操作权限')}
                    deleteCount++
                    isShow = false
                }
            }
            //表达式权限
            if(elem.authDisplayCondition && otherAuth && otherAuth.auth){
                let authDisplayCondition = this.calcStateFunc(otherAuth.auth,'',elem.authDisplayCondition);
                if(!authDisplayCondition){
                    if(elem.functionId=='702'){console.log('表达式权限')}
                }
                isShow = authDisplayCondition
            }
        }
        if(isShow){
            let num = k;
            if(isArray){
                num = num - deleteCount
            }
            newobj[num] = this.deepClone(obj[k],otherAuth)
        }   
      }
      else {
        // 5.如果数据为基本类型，则直接赋值
        newobj[k] = obj[k]
      }
    }
    // 6.把存放了数据的新对象返回出去
    return newobj
};
function commonApi(obj,cb){
    return new Promise((resolve,reject)=>{
        axios.ajax({
            apiType: obj.appType,
            apiNum: obj.api,
            data:  this.getParams(obj,obj.defaultParams)
          }).then((res)=>{
            resolve(res);
            if(cb)cb(res)
          });
    })
}
let selectObj = {}
function getSelect(type,id){
    let publicData = this.getLocal('publicData');
    let arr = [];
    return new Promise((resolve,reject)=>{
        if(selectObj[type]){
            resolve(selectObj[type])
        }
        else if(publicData && publicData[type]){
            arr = publicData[type];
            resolve(arr)
        }else{
            axios.ajax({
                apiType: "bds",
                apiNum: "70500002",
                data: { params: [{ type: type }] },
            }).then((res)=>{
                arr = res.result[type];
                selectObj[type] = arr;
                resolve(arr)
            });
        }
    })
    
    // if(id){
    //     let rId = ''
    //     arr.forEach((item)=>{
    //         if(item.id==id){
    //             rId = item.nameZhCn
    //         }
    //     })
    //     return rId
    // }
    // return arr;
};
function getMenu(type){
    let menus = localStorage.getItem('me_menu');
    menus = JSON.parse(menus)
    let arr = []
    menus.forEach((item)=>{
        if(item.parentFunction==type){
           arr.push(item)
        }
    })
    return arr
};
function getArea(content,label){
    let area = null;
    content.forEach((item)=>{
        if(item.label==label){
            area = item
        }
    })
    return new Promise(function(resolve, reject) {
        if(area){
            resolve(area);
        }
        
    });
};
function getParams(obj,defaultParams){
    let params = obj.params;
    if(!defaultParams)defaultParams={}
    if(!params)params=[]
    let data = {};
    params.forEach((item)=>{ 
        //取URL参数
        if(item.sourceType=='params'){
            data[item.key] = router.app.$route.query[item.source]
        }
        //取页面上表单数据
        else if(item.sourceType=='form'){
            data[item.key] = defaultParams
        }
        //取页接口数据
        else if(item.sourceType=='formData'){
            data[item.key] = defaultParams[item.source]
        }
        //取自定义传入参数
        else if(defaultParams&& defaultParams[item.key]){
            data[item.key] = defaultParams[item.key]
        }
        //取默认值
        else{
            data[item.key] = item.value
        }
    })
    if(obj.paramsWrap){
        let str = JSON.stringify(obj.paramsWrap)
        data = str.replace('"${params}"',JSON.stringify(data))
        data = JSON.parse(data)
    }
    return data;
};
function calcStateFunc(formData,submitCode,condition){
     let state = false;
     for(let key in formData){
         condition = condition.replace(new RegExp('\\${'+key+'}','gm'),'formData.'+key);
     }
     condition = condition.replace(new RegExp('\\${self_value}','gm'),'self_value').replace(new RegExp('\\${self_name}','gm'),'self_name');
     condition = condition.replace(new RegExp('\\${','gm'),'').replace(new RegExp('}','gm'),'');
     try {
         state = eval('`${'+condition+'}`');
     } catch (error) {}
     return state == 'true';
};
function calcValueFunc(formData,submitCode,expression){
    if(!expression){
        return null;
    }
    let currentDate = new Date(),round = this.round,formatDate = this.formatDate,toDate = this.toDate,
        self_value = formData[submitCode],self_name = formData[submitCode+'Name'];
    let val = null;
    for(let key in formData){
        expression = expression.replace(new RegExp('\\${'+key+'}','gm'),'formData.'+key);
    }
    expression = expression.replace(new RegExp('\\${self_value}','gm'),'self_value').replace(new RegExp('\\${self_name}','gm'),'self_name');
    expression = expression.replace(new RegExp('\\${','gm'),'').replace(new RegExp('}','gm'),'');
    try {
        val = eval('`${'+expression+'}`');
    } catch (error) {
        console.info(error)
    }
    return val;
}
function setLocal(key,value){
    localStorage.setItem(key,JSON.stringify(value))
}
function getLocal(key){
    let value = localStorage.getItem(key);
    return JSON.parse(value)
};
function getName(elem,data,emptyText){
    let publicData = this.getLocal('publicData');
    let value, name;
    if(elem.titleCode){
        name = data[elem.titleCode]
    }
    else if(elem.displayCode){
        name = data[elem.displayCode]
    }
    if(name && typeof name == 'object'){
        if(name.address!==undefined){
            name=name.address
        }
        
    }
    
    //如果是下拉框
    if(elem.fieldType=='select' || elem.type=='select'){
        
        // if(!elem.multiple){
        //     name = name ?name : []
        // }else{
        //     name = name ? name : []
        // }
        if(name && (typeof name == 'string' || typeof name == 'number')){
            name = [name]
        }
        if(!name){
            name = []
        }
        //如果是常量表
        if(typeof(elem.itemBelong)=='string'){
            return new Promise((resolve,reject)=>{
                this.getSelect(elem.itemBelong).then((arr)=>{
                    if(arr){
                        let nameArr = []
                        arr.forEach((item)=>{
                            name.forEach((nameItem)=>{
                                if(item.id==nameItem){
                                    nameArr.push(item.nameZhCn)
                                }
                            })
                        })
                        
                        name = nameArr.join(',')
                    }
                    if(name===null ||name===undefined ||name===''){
                        name=emptyText?emptyText:''
                    }
                    resolve(name)
                })
                
            })
            
            
        }else if(typeof(elem.itemBelong)=='object'){
            return new Promise((resolve,reject)=>{
                if(name.length==0){
                    resolve(emptyText ? emptyText : '')
                }else{
                    this.commonApi(elem.itemBelong).then((res)=>{
                        let nameArr =[]
                        res.result.forEach((option)=>{
                            name.forEach((nameItem)=>{
                                if(option.id==nameItem){
                                    nameArr.push(option.nameZhCn)
                                }
                            })
                        })
                        let nameText = nameArr.join(',');
                        if(!nameText)nameText = emptyText?emptyText:'无'
                        resolve(nameText)
                    })
                }
                
            })
        }
        
    }
    if(name===null ||name===undefined ||name===''){
        name=emptyText?emptyText:''
    }
    return new Promise((resolve,reject)=>{
        resolve(name)
    })
};
function toTree(data, id, pid) { //pid 为关联id 菜单遍历
    if(!data){
        console.error('toTree:data未定义')
        // return []
    }
    let dataCopy = JSON.parse(JSON.stringify(data));
    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    let map = {},hasLevel = false;
    dataCopy.forEach(function (item) {
      if(item[pid] === null || item[pid] === undefined){
            item[pid] = -1;
        }
        if(item.level !== null && item.level !== undefined){
            hasLevel = true;
            map[item[id]+'-'+item.level] = item;
        }else{
            map[item[id]] = item;
        }
        
    });
    let result = [];
    dataCopy.forEach(function (item) {
        item.text = item.nameZhCn
      // 以当前遍历项的pid,去map对象中找到索引的id
      let parent = undefined;
      if(!hasLevel){
        parent = map[item[pid]];
      }else{
        parent = map[item[pid]+'-'+(item.level - 1)];
      }
      //如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
      if (parent) {
        (parent.children || (parent.children = [])).push(item);
      } else {
        //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 result结果集中，作为顶级
        result.push(item);
      }
    });
    return result;
}
// function getName(elem,data,emptyText){
//     let publicData = this.getLocal('publicData');
//     let value, name;
//     if(elem.titleCode){
//         name = data[elem.titleCode]
//     }
//     else if(elem.displayCode){
//         name = data[elem.displayCode]
//     }
//     if(name && typeof name == 'object'){
//         if(name.address!=undefined){
//             name=name.address
//         }
        
//     }
//     if(typeof(elem.itemBelong)=='string'){
//         let arr = publicData[elem.itemBelong];
//         if(arr){
//             arr.forEach((item)=>{
//                 if(item.id==name){
//                     name = item.nameZhCn
//                 }
//             })
//         }
//     }
//     if(!name){
//         name=emptyText?emptyText:''
//     }
//     return new Promise((resolve,reject)=>{
//         resolve(name)
//     })
// };
function isArrayFind(array,key,value){
    let isFind = false;
    array.forEach((item)=>{
        if(item.nameZhCn=='HRVP')console.log(item)
        if(item[key]==value){
            isFind = true;
        }
    })
    return isFind
}
function findArrayItem(array,key,value){
    let item = null;
    array.forEach((obj)=>{
        if(obj[key]==value){
            item = obj;
        }
    })
    return item;
}
function addEdit(origin,index) {
    for(var prop in origin ){
        if(prop.indexOf('$')!=-1){
            origin[prop.substring(1)] = origin[prop][index]
        }
        if(origin.hasOwnProperty(prop)){
            if(origin[prop] instanceof Array){
                addEdit(origin[prop],index);
            }else if(origin[prop] instanceof Object){
                addEdit(origin[prop],index);
            }
        }
    }
}

// 深拷贝
function clone(obj) {
    // 3.根据obj为对象或者数组，产生一个空的对象或数组，存放数据
    var newobj = obj instanceof Array ? [] : {};
    // 1.for...in进入循环
    for (var k in obj) {
        // 2.判断对象的第一个属性是否为数组或者对象，如果是，则进入递归
        // if (obj[k] instanceof Array) {
        //   newobj[k] = cloneDeep(obj[k])
        // } else if (obj[k] instanceof Object) {
        //   newobj[k] = cloneDeep(obj[k])
        // }
        // 4.上面两个执行逻辑一样，进行合并
        if (typeof obj[k] === 'object') {
        newobj[k] = clone(obj[k])
        } else {
        // 5.如果数据为基本类型，则直接赋值
        newobj[k] = obj[k]
        }
    }
    return newobj
}
// 6.把存放了数据的新对象返回出去
function isWx(){
    return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
}
function base64Img(fileObj){
    return new Promise((resolve,reject)=>{
        var type = fileObj.type,size = fileObj.size / 1024;
        if ( typeof (FileReader) === 'undefined' || size <= 300) {      
            // resolve(fileObj)
            //调用上传方式不压缩  超过200k 压缩图片
            directTurnIntoBase64();  
        } else {       
            var reader = new FileReader();    
            reader.onload = function (e) { //要先确保图片完整获取到，这是个异步事件              
                var image = new Image();  
                image.src=e.target.result;
                image.onload = function(){    
                    let square = 1;   //定义画布的大小，也就是图片压缩之后的像素  
                    let canvas = document.createElement('canvas'); //创建canvas元素  
                    let context = canvas.getContext('2d');  
                    let imageWidth = Math.round(square*image.width);    //压缩图片的大小  
                    let imageHeight = Math.round(square*image.height); 
                    let data = '';   
                    canvas.width = imageWidth;
                    canvas.height = imageHeight;   
                    //context.clearRect(0, 0, imageWidth, imageHeight);  //在给定矩形内清空一个矩形   
                    //context.drawImage(this, 0, 0, imageWidth, imageHeight); 
                    context.drawImage(this, 0, 0);
                    data = canvas.toDataURL('image/jpeg',300/size);
                    //压缩完成执行回调    
                    resolve(data);    
                    // resolve(dataURLtoFile(data));    
                };      
            };    
            reader.readAsDataURL(fileObj);           
        }  
        function dataURLtoFile(dataurl) { 
            var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], fileObj.name, { type: mime });
        }
        function directTurnIntoBase64(){  
            var r = new FileReader();  
            // 转成base64  
            r.onload = function(){  
                //变成字符串  
                let imgBase64 = r.result;  
                
                resolve(imgBase64);  
            }  
            r.readAsDataURL(fileObj);    //转成Base64格式  
        } 
    })
    
}
Free.install = function(Vue){
    Vue.prototype.$free = {
        isFilter : false,
        deepClone,
        getLocal,
        getName,
        getSelect,
        getMenu,
        getParams,
        commonApi,
        getArea,
        calcStateFunc,
        calcValueFunc,
        toTree,
        isArrayFind,
        findArrayItem,
        addEdit,
        getPos,
        clone,
        isWx,setLocal,
        base64Img
    };
}
export default Free;