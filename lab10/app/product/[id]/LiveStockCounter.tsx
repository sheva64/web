'use client'; // Вказує, що це клієнтський компонент

import { useState, useEffect } from 'react';

export default function LiveStockCounter({ initialStock }: { initialStock: number }) {
  const [stock, setStock] = useState(initialStock);
  const [isClient, setIsClient] = useState(false);

  // useEffect виконується лише на клієнті після гідратації (hydration)
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
      <h3>Live Stock Counter</h3>
      <p>Залишок на складі: {stock}</p>
      
      {/* Кнопка стає активною лише після успішної гідратації на клієнті */}
      <button 
        disabled={!isClient || stock === 0} 
        onClick={() => setStock(s => s - 1)}
      >
        {!isClient ? 'Завантаження...' : (stock > 0 ? 'Add to Cart' : 'Немає в наявності')}
      </button>
    </div>
  );
}