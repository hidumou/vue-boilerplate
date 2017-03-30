/**
 * @file index
 * Created by haner on 2017/3/30.
 * @brief mock 数据入口文件
 */

import Mock from 'mockjs';

import './home';

Mock.setup({
  timeout: '500-1000'
});


export default Mock;
