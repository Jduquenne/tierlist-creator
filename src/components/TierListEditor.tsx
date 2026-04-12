import React, { useState } from 'react';
import { DndContext, DragStartEvent, DragEndEvent, DragOverlay, closestCenter } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

import type { Item, TierList } from '../types/models';
import RankContainer from './RankContainer';
import PaletteContainer from './PaletteContainer';

interface Props {
    tierList: TierList;
    setTierList: React.Dispatch<React.SetStateAction<TierList>>;
}

interface DragData {
    container: string;
    index: number;
}

export default function TierListEditor({ tierList, setTierList }: Props) {
    const [activeId, setActiveId] = useState<string | null>(null);

    const handleDragStart = ({ active }: DragStartEvent) => {
        setActiveId(active.id.toString());
    };

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (!over) return;

        // always defined on draggable
        const activeData = active.data.current as DragData;
        const fromContainer = activeData.container;
        const fromIndex = activeData.index;

        // over.data.current exists only when over draggable, not droppable container
        const overData = over.data?.current as DragData | undefined;
        // determine target container and index fallback
        let toContainer: string;
        let toIndex: number;
        if (overData) {
            toContainer = overData.container;
            toIndex = overData.index;
        } else {
            // dropped on empty container
            toContainer = String(over.id);
            // next index = current length of that container
            toIndex = toContainer === 'unplaced'
                ? tierList.unplacedItems.length
                : tierList.ranks.find(r => r.id === toContainer)?.items.length ?? 0;
        }

        setTierList(prev => {
            // Clone en profondeur
            const newRanks = prev.ranks.map(r => ({ ...r, items: [...r.items] }));
            const newUnplaced = [...prev.unplacedItems];

            // Sélectionner liste source et destination
            const sourceList = fromContainer === 'unplaced'
                ? newUnplaced
                : newRanks.find(r => r.id === fromContainer)!.items;
            const destList = toContainer === 'unplaced'
                ? newUnplaced
                : newRanks.find(r => r.id === toContainer)!.items;

            // Extraire l’élément
            const [moving] = sourceList.splice(fromIndex, 1);
            // Insérer à l’index précis
            destList.splice(toIndex, 0, moving);

            return {
                ...prev,
                ranks: newRanks,
                unplacedItems: newUnplaced
            };
        });
    };

    // Find the active item data for overlay
    const renderOverlay = () => {
        if (!activeId) return null;
        const [itemId, container] = activeId.split('|');
        let item: Item | undefined;
        if (container === 'unplaced') {
            item = tierList.unplacedItems.find(i => i.id === itemId);
        } else {
            const rank = tierList.ranks.find(r => r.id === container);
            item = rank?.items.find(i => i.id === itemId);
        }
        if (!item) return null;
        return (
            <div style={{
                width: 80,
                height: 80,
                opacity: 0.8,
                border: '2px solid #888',
                borderRadius: 4,
                background: '#fff',
                overflow: 'hidden'
            }}>
                <img
                    src={item.imageSrc}
                    alt={item.label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
        );
    };

    return (
        <DndContext collisionDetection={closestCenter} modifiers={[restrictToWindowEdges]} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            {tierList.ranks.map(rank => (
                <SortableContext
                    key={rank.id}
                    items={rank.items.map(item => `${item.id}|${rank.id}`)}
                    strategy={horizontalListSortingStrategy}
                >
                    <RankContainer
                        id={rank.id}
                        label={rank.label}
                        color={rank.color}
                        items={rank.items}
                    />
                </SortableContext>
            ))}

            <SortableContext
                items={tierList.unplacedItems.map(item => `${item.id}|unplaced`)}
                strategy={horizontalListSortingStrategy}
            >
                <PaletteContainer items={tierList.unplacedItems} />
            </SortableContext>

            <DragOverlay dropAnimation={{ duration: 0 }} >
                {renderOverlay()}
            </DragOverlay>
        </DndContext>
    );
}