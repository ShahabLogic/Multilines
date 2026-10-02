export function normaliseWhatsAppNumber(phone = '') {
  const digits = String(phone).replace(/\D/g, '');
  if (!digits) return '923034446027';
  return digits.startsWith('0') ? `92${digits.slice(1)}` : digits;
}

const hasPrice = (price) => price !== null && price !== undefined && price !== '' && Number.isFinite(Number(price));
const money = (value) => `PKR ${Number(value).toLocaleString('en-PK')}`;

export function buildWhatsAppOrderLink(items, phone, companyName = 'Multilines Coating Solutions') {
  const lines = [`Hello ${companyName}, I would like to request an order/quote for:`];
  (items || []).forEach((item, index) => {
    const product = item.product || item;
    const quantity = Math.max(1, Number(item.quantity) || 1);
    lines.push(`${index + 1}. ${product.name || 'Product'}${product.sku ? ` (${product.sku})` : ''} × ${quantity}${hasPrice(product.price) ? ` — ${money(Number(product.price) * quantity)}` : ' — price on request'}`);
  });
  lines.push('', 'Please confirm availability, specification and delivery details. Thank you.');
  return `https://wa.me/${normaliseWhatsAppNumber(phone)}?text=${encodeURIComponent(lines.join('\n'))}`;
}
