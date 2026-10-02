import React from 'react';

export function ResinSample({ variant = 'epoxy', label = 'SYSTEM SAMPLE', compact = false }) {
  return (
    <div className={`resin-object${compact ? ' resin-object--compact' : ''}`} aria-label={`${label} 3D floor system sample`} role="img">
      <div className={`resin-object__layers resin-object__layers--${variant}`}>
        <span className="resin-object__layer resin-object__layer--top" />
        <span className="resin-object__layer resin-object__layer--body" />
        <span className="resin-object__layer resin-object__layer--base" />
        <span className="resin-object__face" />
      </div>
      <div className="resin-object__caption"><small>{label}</small><span>01 / 03</span></div>
      <span className="resin-object__glint" />
    </div>
  );
}

export function PaintCan({ compact = false, label = 'COATING SYSTEM' }) {
  return (
    <div className={`paint-object${compact ? ' paint-object--compact' : ''}`} aria-label="Three-dimensional protective coating paint can" role="img">
      <span className="paint-object__handle" />
      <span className="paint-object__lid" />
      <span className="paint-object__body"><b>MC</b><small>{label}</small><i /></span>
      <span className="paint-object__shadow" />
    </div>
  );
}
