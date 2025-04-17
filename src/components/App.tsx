import { useState } from 'react'
import '../App.css'
import type { TierList, Rank } from '../types/models';
import Header from './Header';
import TierListEditor from './TierListEditor';

const INITIAL_TIERS: Rank[] = [
  { id: 's', label: 'S', color: '#e74c3c', items: [] },
  { id: 'a', label: 'A', color: '#f39c12', items: [] },
  { id: 'b', label: 'B', color: '#f1c40f', items: [] }
];

const App: React.FC = () => {
  const [tierList, setTierList] = useState<TierList>({
    title: 'My Tier List',
    ranks: INITIAL_TIERS,
    unplacedItems: []
  });

  return (
    <div>
      <Header title={tierList.title} />
      <TierListEditor tierList={tierList} setTierList={setTierList} />
    </div>
  );
};

export default App;