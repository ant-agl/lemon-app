export default (strDate) => {
  const pattern = /(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[12])\.\d{4}/gi;
  return strDate == "" || pattern.test(strDate);
};
