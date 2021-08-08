import homeHttp from './user';
import baiduHttp from './baidu';
import userHttp from './user';
import shopHttp from './shop';
export default {
  ...homeHttp,
  ...baiduHttp,
  ...userHttp,
  ...shopHttp,
};
