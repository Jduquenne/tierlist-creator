import { PropsWithChildren } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Item } from '../types/models';

interface DroppableProps {
    id: string;
}

export default function DroppableItem({
    id,
    children
}: PropsWithChildren<DroppableProps>) {
    const { setNodeRef } = useDroppable({ id });
    return (
        <div
            ref={setNodeRef}
            style={{
                minHeight: 120,
                border: '2px dashed #bbb',
                borderRadius: 4,
                padding: 8,
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
                background: '#f9f9f9'
            }}
        >
            {children}
        </div>
    );
}

interface DraggableProps {
    item: Item;
    containerId: string;
    index: number;
}

export function Item({ item, containerId, index }: DraggableProps) {
    const id = `${item.id}|${containerId}`;
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id,
        data: { container: containerId, index }
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={{
                transform: transform ? CSS.Transform.toString(transform) : undefined,
                transition,
                opacity: isDragging ? 0.5 : 1,
                width: 80,
                height: 80,
                border: '1px solid #ccc',
                borderRadius: 4,
                overflow: 'hidden',
                background: '#fff'
            }}
        >
            <img
                src={item.imageSrc}
                alt={item.label}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        </div>
    );
}

// faciliter l’import : DroppableItem.Item
DroppableItem.Item = Item;