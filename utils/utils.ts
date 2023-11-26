type IParams = string | string[] | undefined;
type IParam = 'page' | 'search' | 'details';

const pathHasParam = (params: IParams, param: IParam): boolean =>
  Array.isArray(params) ? params.some((item) => item.includes(param)) : false;

const findAnyParam = (params: IParams, param: IParam): string =>
  Array.isArray(params)
    ? params.find((item) => item.includes(param))?.split('=')[1] || ''
    : '';

const replacePathParam = (path: string, param: IParam, replace: string) => {
  const pathArr = path.split('/');
  const index = pathArr.findIndex((item) => item.includes(param));
  if (index !== -1) {
    pathArr[index] = replace;
  } else {
    return path;
  }
  return pathArr.join('/');
};

export { pathHasParam, findAnyParam, replacePathParam };
