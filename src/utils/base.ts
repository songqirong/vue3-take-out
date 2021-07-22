import router from 'src/routes';
export const no_login:(url?:string) => void = (url = location.href) => {
  const from = encodeURIComponent(url);
  router.push({
    path: '/login',
    params: { from },
  });
};
