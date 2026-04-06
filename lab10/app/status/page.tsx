import { headers } from 'next/headers';

// Явно вказуємо Next.js генерувати сторінку динамічно для кожного запиту
export const dynamic = 'force-dynamic'; 

export default async function SystemStatus() {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || 'Невідомо';
  const currentTime = new Date().toISOString();

  return (
    <main>
      <h1>Стан системи (System Status)</h1>
      <p>Поточний час сервера: {currentTime}</p>
      <p>User Agent: {userAgent}</p>
    </main>
  );
}