export const currencyFormatter = (price: number): string => {
  const formatter = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  });

  return formatter.format(price);
};
