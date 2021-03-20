import Vue from 'vue'
import {
    ValidationObserver,
    ValidationProvider,
    extend
  } from 'vee-validate';
  import * as rules from 'vee-validate/dist/rules';
  import {
    configure
  } from 'vee-validate';
  configure({
    classes: {
      valid: 'is-valid',
      invalid: 'is-invalid',
      dirty: ['is-dirty', 'is-dirty'], // multiple classes per flag!
      // ...
    }
  })
  Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
  });
  extend("required", {
    params: ["config"],
    validate: (value, { config }) => {
      console.log(value,config)
      if(!config.required)return true
      if (value instanceof Array) {
        if (value.length == 0) {
          return errormsg()
        } else {
          let isEmpty = false
          if(config.type=='uploadImage'){
            
            value.forEach((item)=>{
              console.log(item)
              if(!item.id){
                isEmpty = true;
              }
            })
          }
          
          if(isEmpty){
            return '请等待文件上传完毕！'
          }
          return true
        }
      } else {
        if (!value && value !== 0) {
          return errormsg()
        }
        return true
      }
      function errormsg(){
        if(config.fieldName){
          if(config.type=='text'){
            return '请输入' + config.fieldName
          }else{
            return '请选择' + config.fieldName
          }
        }
        return '错误信息未配置'
      }
    },
    // message:
    //   "The difference between the two numbers is too great. The maximum allowed is difference is {maxDifference}."
  });
  extend('even', value => {
    return value % 2 === 0;
  });
  extend('num', value => {
    if(/^-?\d+(\.\d*)?$/.test(value)){
      return true;
    }
    return '必须为数字'
  });
  extend('num_pos_zero', value => {
    if(/^(0|[1-9][0-9]*)$/.test(value)){
      return true;
    }
    return '必须为大于等于0的整数'
  });
  extend('num_pos', value => {
    if(/^[1-9]\d*$/.test(value)){
      return true;
    }
    return '必须为大于等于0的整数'
  });
  extend('f2_0_100', value => {
    if(/^(\d{1,2}(\.\d{1,2})?|100|100.0|100.00)$/.test(value)){
      return true;
    }
    return '必须为0-100数字且最多包含两位小数'
  });
  
  extend('f2_pos', value => {
    if(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/.test(value)){
      return true;
    }
    return '必须为正数且最多两位小数'
  });
  extend('mobile', value => {
    if(/^[1]\d{10}$/.test(value)){
      return true;
    }
    return '必须为1开头的11位数字'
  });
  extend('email', value => {
    if(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})?$/.test(value)){
      return true;
    }
    return '必须为正确的邮箱格式'
  });
  extend('numLetter', value => {
    if(/[/^[a-zA-Z0-9]+$/.test(value)){
      return true;
    }
    return '只能是数字或字母'
  });
  extend('telephone', value => {
    if(/^([0-9]|[-])+$/.test(value)){
      return true;
    }
    return "只能是数字或 '-' "
  });
  extend('idnumber', value => {
    if(/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/.test(value)){
      return true;
    }
    return "请输入完整且符合的身份证号码"
  });
  Vue.component('ValidationProvider', ValidationProvider);
  Vue.component('ValidationObserver', ValidationObserver);