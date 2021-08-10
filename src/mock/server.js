/*
使用mockjs提供mock数据接口
 */
import Mock from 'mockjs';
import data from './shop/index.json';
// 解决mockjs影响axios的cookie传递问题
Mock.XHR.prototype.withCredentials = true;

// 返回goods的接口
Mock.mock('/shop/goods', { error_code: 'NONE', message: '获取成功', data: data.goods });
// 返回ratings的接口
Mock.mock('/shop/ratings', { error_code: 'NONE', message: '获取成功', data: data.ratings });
// 返回info的接口
Mock.mock('/shop/info', { error_code: 'NONE', message: '获取成功', data: data.info });

// export default ???  不需要向外暴露任何数据, 只需要保存能执行即可
