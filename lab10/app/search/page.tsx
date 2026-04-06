export const dynamic = 'force-dynamic'; // Змушує Next.js рендерити сторінку на кожен новий запит

export default async function SearchResults({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  // Розпаковуємо searchParams
  const resolvedSearchParams = await searchParams;
  
  // Отримуємо параметр 'q' з URL
  const query = resolvedSearchParams.q || '';
  
  const res = await fetch(`https://dummyjson.com/products`);
  const data = await res.json();
  
  // Дістаємо масив продуктів з об'єкта, який повертає DummyJSON
  const allProducts = data.products || [];
  
  // Фільтруємо дані на сервері на основі запиту
  const filteredProducts = allProducts.filter((product: any) => 
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main>
      <h1>Результати пошуку для: "{query}"</h1>
      {filteredProducts.length > 0 ? (
        <ul>
          {filteredProducts.map((product: any) => (
            <li key={product.id}>
              <strong>{product.title}</strong> - ${product.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>Нічого не знайдено.</p>
      )}
    </main>
  );
}