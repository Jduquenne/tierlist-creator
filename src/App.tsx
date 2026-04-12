import React, { useState } from 'react';
import type { TierList, Rank, Item } from './types/models';
import TierListEditor from './components/TierListEditor';

const INITIAL_RANKS: Rank[] = [
  { id: 's', label: 'S', color: '#e74c3c', items: [] },
  { id: 'a', label: 'A', color: '#f39c12', items: [] },
  { id: 'b', label: 'B', color: '#f1c40f', items: [] },
];

export default function App() {
  const [tierList, setTierList] = useState<TierList>({
    title: "",
    ranks: INITIAL_RANKS,
    unplacedItems: [],
  });

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newItems: Item[] = files.map(file => ({
      id: URL.createObjectURL(file),
      label: file.name,
      imageSrc: URL.createObjectURL(file),
    }));

    setTierList(prev => ({
      ...prev,
      unplacedItems: [...prev.unplacedItems, ...newItems],
    }));

    e.target.value = '';
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <h1>Tier List Creator</h1>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleUpload}
        style={{ marginBottom: 16 }}
      />
      <TierListEditor tierList={tierList} setTierList={setTierList} />
    </div>
  );
}