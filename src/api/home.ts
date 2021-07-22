import axios from 'utils/http';
export const getUserInfo:() => void = () => Promise.resolve({ data: 'hello' }) ;
export default {
  getUserInfo,
};
