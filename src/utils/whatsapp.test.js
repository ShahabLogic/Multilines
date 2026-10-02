import { buildWhatsAppOrderLink, normaliseWhatsAppNumber } from './whatsapp';

describe('WhatsApp order links', () => {
  test('formats the supplied Pakistan phone number as an international wa.me link', () => {
    expect(normaliseWhatsAppNumber('0303-4446027')).toBe('923034446027');
  });

  test('includes selected products, quantities and quote details in the message', () => {
    const link = buildWhatsAppOrderLink([
      { product: { name: 'Jotafloor Epoxy System', sku: 'MCS-JF-01', price: 2500 }, quantity: 2 },
      { product: { name: 'EPDM Track Surface', price: null }, quantity: 1 }
    ], '0303-4446027');
    const url = new URL(link);
    const message = url.searchParams.get('text');

    expect(url.hostname).toBe('wa.me');
    expect(url.pathname).toBe('/923034446027');
    expect(message).toContain('Jotafloor Epoxy System (MCS-JF-01) × 2');
    expect(message).toContain('PKR 5,000');
    expect(message).toContain('EPDM Track Surface × 1 — price on request');
    expect(message).toContain('Please confirm availability, specification and delivery details.');
  });
});
