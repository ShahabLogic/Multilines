import React from 'react';

export default function BrandMark({ compact = false, light = false, companyName = 'Multilines Coating Solutions' }) {
  const [lead, ...remainder] = String(companyName || 'Multilines Coating Solutions').trim().split(/\s+/);
  return (
    <span className={`brand-mark${compact ? ' brand-mark--compact' : ''}${light ? ' brand-mark--light' : ''}`} aria-label={companyName}>
      <img src="/images/logo.jpg" alt={companyName || 'Multilines Coating Solutions'} style={{ height: compact ? '40px' : '60px', width: 'auto', objectFit: 'contain', mixBlendMode: light ? 'screen' : 'multiply', filter: light ? 'invert(1) contrast(1.2)' : 'none' }} />
      <span className="brand-mark__wording">
        <strong>{lead || 'Multilines'}</strong>
        {!compact && <small>{remainder.length ? remainder.join(' ') : 'Coating Solutions'}</small>}
      </span>
    </span>
  );
}
