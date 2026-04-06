import { notFound } from 'next/navigation';
import LiveStockCounter from './LiveStockCounter';

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  // Розпаковуємо params
  const resolvedParams = await params;
  
  const res = await fetch(`https://dummyjson.com/products/${resolvedParams.id}`);
  
  // Якщо продукт не знайдено, викликаємо notFound()
  if (!res.ok) {
    notFound(); // Це автоматично відобразить сторінку 404 на сервері
  }

  const product = await res.json();

  return (
    <main>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Ціна: ${product.price}</p>
      
      <LiveStockCounter initialStock={10} />
    </main>
  );
}