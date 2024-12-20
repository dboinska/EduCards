export const pipe =
  <T>(...fns: Array<(arg: T) => T | Promise<T>>) =>
  (value: T) =>
    fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(value))
