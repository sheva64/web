import React from 'react';

// Generic тип, який вимагає наявності поля id (number або string)
interface ListProps<T extends { id: number | string }> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

// Визначення компонента з дженериком
const List = <T extends { id: number | string }>({ items, renderItem }: ListProps<T>) => {
  return (
    <div className="list-container">
      {items.map((item) => (
        <div key={item.id}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
};

export default List;