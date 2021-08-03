import router from 'src/routes';
import store from 'store/index';
import { initState } from 'store/modules/user/state';

// 跳转页面
export const jump_to_page = (obj: { name?: string; path?: string; params?: Record<string, any>; query?: Record<string, any>; state?: Record<string, any>} | string) => {
  router.push(obj);
};


// 跳转至登录页
export const go_login: () => void = () => {
  router.push({
    name: 'Login',
  });
};

// 返回上一页
export const go_back = () => {
  router.back();
};

// token过期清空登录态
export const no_token = () => {
  store.commit('user/changeUserInfo', clone_deep(initState));
};

// 解析路径
export function qs_parse(url: string = location.href) {
  url = url.slice(url.indexOf('?') + 1);
  url = url.replace(/#.*/, '');
  const obj: Record<string, any> = {};
  url.split('&').forEach((item) => {
    const arr = item.split('=');
    obj[arr[0]] = arr[1];
  });
  return obj;
}


// 手机验证格式
export const check_phone = (phone: string): boolean => /^1[3456789]\d{9}$/.test(phone);

// 找到数组中对象的坐标
export const findObjIdxFromArr = (arr: any[], obj: any) => arr.findIndex((item) => {
  for(const key in obj){
    if(item[key] === obj[key]){
      return item;
    }
  }
});

// 深拷贝
export const clone_deep = (obj: any) => JSON.parse(JSON.stringify(obj));
