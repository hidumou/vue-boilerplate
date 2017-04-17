/**
 * @file validator.extends
 * Created by haner on 2017/4/15.
 * @brief
 */

import Vue from 'vue';
import VeeValidate,{ Validator } from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';


Validator.addLocale(zh_CN);

Vue.use(VeeValidate,{
  locale: 'zh_CN'
});



Validator.extend('mobile', {
  messages: {
    zh_CN:field => `${field}必须是11位手机号码`,
  },
  validate: value => {
    return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
});
