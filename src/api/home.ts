import axios from 'utils/http';
export const getUserInfo:() => void = () => axios({
  url: '/hello',
  method: 'get',
});
