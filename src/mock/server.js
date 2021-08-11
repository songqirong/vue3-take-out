/*
使用mockjs提供mock数据接口
 */
import Mock, { Random } from 'mockjs';
import data from './shop/index.json';
// 解决mockjs影响axios的cookie传递问题
Mock.XHR.prototype.withCredentials = true;
// 设置延时
Mock.setup({
  timeout: '1000-2000',
});

// 返回goods的接口;
Mock.mock('/shop/goods', { error_code: 'NONE', message: '获取成功', data: data.goods });
// 返回ratings的接口
Mock.mock('/shop/ratings', { error_code: 'NONE', message: '获取成功', data: data.ratings });
// 返回info的接口
Mock.mock('/shop/info', { error_code: 'NONE', message: '获取成功', data: data.info });
// 首页shop数据模拟
Mock.mock('/shops', {
  error_code: 'NONE',
  message: '获取成功',
  // URL: ''
  'data|20': [
    {
      _id: '@id', // id
      name: '@cword(3, 5)', // 名字
      image: Random.image('100x100', Random.color(), 'pink', 'png', '@cword(3, 5)'), // 图片
      'rating|3-4.1': 1, // 评分
      'is_premium|1': true, // 是否品牌
      'recent_order_num|1-100': 1, // 订单数
      'float_minimum_order_amount|1-10': 1, // 配送起
      'float_delivery_fee|1-5': 1, // 配送费
      delivery_mode: '桔止专送',
      supports: [
        {
          _id: '@id',
          icon_color: '#01A742',
          description: '已加入“外卖保”计划，食品安全有保障',
          icon_name: '保',
          name: '外卖保',
        },
        {
          _id: '@id',
          icon_color: '#57A9FF',
          description: '准时必达，超时秒赔',
          icon_name: '准',
          name: '准时达',
        },
        {
          _id: '@id',
          icon_color: '#FFBA3B',
          description: '该商家支持开发票，请在下单时填写好发票抬头',
          icon_name: '票',
          name: '开发票',
        },
      ],
    },
  ],
});
// console.log(hisList, 'his');

// export default ???  不需要向外暴露任何数据, 只需要保存能执行即可
