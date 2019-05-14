/**
 * 缓存函数
 * @param {*} fn
 */
const cached = fn => {
  const cache = Object.create(null);

  return function cachedFn(str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};

/**
 * 首字母大写
 */
export const capitalize = cached(str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
