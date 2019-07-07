import React from 'react';

export default function Toast({ type, msg }) {
  return (
    <div className="mt-3">
      <h3 style={type === 'success' ? { color: '#44bd32' } : type === 'error' ? { color: '#c23616' } : {}}>{msg}</h3>
    </div>
  );
}
