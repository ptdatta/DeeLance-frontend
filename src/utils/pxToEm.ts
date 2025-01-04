const pxToEm = (value: number) => {
  const conversion = value / 16;

  return `${conversion}em`;
};

export default pxToEm;
