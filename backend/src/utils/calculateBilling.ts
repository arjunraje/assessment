export function calculateBilling(
  quantity: number,
  price: number,
  taxPercentage: number
) {
  const itemTotal = quantity * price;
  const taxAmount = (itemTotal * taxPercentage) / 100;
  const subTotal = itemTotal + taxAmount;

  let discount = 0;
  if (subTotal >= 1000 && subTotal <= 2000) discount = subTotal * 0.01;
  if (subTotal > 2000) discount = subTotal * 0.02;

  const finalTotal = subTotal - discount;

  return { itemTotal, taxAmount, subTotal, discount, finalTotal };
}