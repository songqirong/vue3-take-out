import axios from 'utils/http';

const ak = 'WZqxk8iUPT37VEV11CwqGgjDTGrKwCPl';

/* 接入百度位置查询api 会跨域 nodejs转发解决跨域 */


export const getLocation = (latitude, longitude) => axios.get('/conver/parsingPosition', { params: {
  ak,
  output: 'json',
  coordtype: 'wgs84ll',
  location: `${latitude},${longitude}`,
} });

// 会有偏差，用来把GPS标准坐标转换成百度地图的坐标 https://lbsyun.baidu.com/index.php?title=webapi/guide/changeposition
export const parsingLocation = (latitude, longitude) => axios.get('/conver/conversionPosition?', { params: {
  ak,
  output: 'json',
  coords: `${latitude},${longitude}`,
  from: '1',
  to: '5',
} });



/* 使用jsonp解决跨域 弃用 nodejs进行转发 */
// 根据经纬度获取定位
// export const getLocation = (latitude, longitude, callback) => {
//   //注意这里挂载在了window上
//   (window as any).callback = callback;
//   const url = `http://api.map.baidu.com/reverse_geocoding/v3/?ak=${ak}&output=json&callback=callback&location=${latitude},${longitude}&coordtype=wgs84ll`;
//   //插入一个script
//   const script = document.createElement('script');
//   script.setAttribute('src', url);
//   document.body.appendChild(script);
// };


export default{
  getLocation,
  parsingLocation,
};
