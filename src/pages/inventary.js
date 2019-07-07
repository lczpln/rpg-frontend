import React from 'react';

import { useSelector } from 'react-redux';

export default function Inventary() {
  const inventary = useSelector(state => state.player.inventary)
  return (
    <div>
      {inventary.map(item => (
        <div>
          <img src={item.img} alt="" />
          <h3>{item.name} x{item.qtd}</h3>
        </div>
      ))}
    </div>
  );
}
