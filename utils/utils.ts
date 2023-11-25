const pathHasDetails = (params: string | string[] | undefined) => {
  if (params && Array.isArray(params)) {
    return params.find((item) => item.includes('details')) ? true : false;
  } else {
    return false;
  }
};

export { pathHasDetails };
