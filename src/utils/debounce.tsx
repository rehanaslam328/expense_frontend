export const debounce = (fn: any, delay: any) => {
  //@ts-ignore
  let timer;
  return function () {
    //@ts-ignore
    let context = this,
      args = arguments;
    //@ts-ignore
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};
