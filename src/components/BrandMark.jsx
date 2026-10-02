import React from 'react';

export default function BrandMark({ compact = false, light = false, companyName = 'Multilines Coating Solutions' }) {
  const [lead, ...remainder] = String(companyName || 'Multilines Coating Solutions').trim().split(/\s+/);
  return (
    <span className={`brand-mark${compact ? ' brand-mark--compact' : ''}${light ? ' brand-mark--light' : ''}`} aria-label={companyName}>
      <svg className="brand-mark__icon" viewBox="0 0 52 42" role="img" aria-hidden="true">
        <path d="M5 13.5C17 4.5 30 3 46 7" fill="none" stroke="#dc6755" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M4 21C17 12 31 11 47 15" fill="none" stroke="#72a970" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M7 28.5C19 20 32 20 45 24" fill="none" stroke="#5393bd" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M11 35C22 28 33 29 42 32" fill="none" stroke="#d8a34a" strokeWidth="4.5" strokeLinecap="round" />
      </svg>
      <span className="brand-mark__wording">
        <strong>{lead || 'Multilines'}</strong>
        {!compact && <small>{remainder.length ? remainder.join(' ') : 'Coating Solutions'}</small>}
      </span>
    </span>
  );
}
