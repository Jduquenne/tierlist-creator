import React from 'react';
import type { TierList } from '../types/models';

interface EditorProps {
    tierList: TierList;
    setTierList: React.Dispatch<React.SetStateAction<TierList>>;
}

const TierListEditor: React.FC<EditorProps> = ({ tierList, setTierList }) => {
    return (
        <main style={{ padding: '1rem' }}>
            {tierList.ranks.map(rank => (
                <div key={rank.id} style={{ marginBottom: '1rem' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{rank.label}</div>
                    <div
                        style={{
                            minHeight: '100px',
                            border: '2px dashed #bdc3c7',
                            borderRadius: '4px',
                            padding: '0.5rem'
                        }}
                    >
                        {/* Ici on injectera les ItemCards et le droppable */}
                    </div>
                </div>
            ))}
            <section style={{ marginTop: '2rem' }}>
                <h2>Palette d’images</h2>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {/* Ici on affichera les images non placées */}
                </div>
            </section>
        </main>
    );
};

export default TierListEditor;