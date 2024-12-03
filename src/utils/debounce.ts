export const debounce = (cb: (...args: any[]) => void, delay: number) => {
  let timer: NodeJS.Timeout | null | number = null;

  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      cb.apply(this, args);
    }, delay);
  };
};
