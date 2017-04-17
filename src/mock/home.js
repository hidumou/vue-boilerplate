/**
 * @file home
 * Created by haner on 2017/3/30.
 */

import Mock from 'mockjs';

/**
 * 首页列表
 */
Mock.mock(
  '/index/getList', {
    "data":{
      "code":"1000",
      "msg":"success",
      "data|10":[
        {
          "name":"@cname",
          "tag|1-3":["标签1","标签2","标签3",'最热'],
          "avatar":"@image",
          "content":"@cparagraph",
          "articleId|+1":1
        },
      ]
    }
  }
);

export default Mock;
