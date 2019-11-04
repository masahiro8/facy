export const getUrlParam = () => {
  let arg = {};
  const params = location.search.substring(1).split('&');
  for (let i = 0; params[i]; i++) {
    let kv = params[i].split('=');
    arg[kv[0]] = kv[1];
  }
  return arg;
};
