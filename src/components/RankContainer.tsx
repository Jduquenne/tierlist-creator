import DroppableItem from './DroppableItem';
import type { Item } from '../types/models';

interface Props {
    id: string;
    label: string;
    color: string;
    items: Item[];
}

export default function RankContainer({ id, label, color, items }: Props) {
    return (
        <div style={{ marginBottom: 24 }}>
            <h2 style={{
                margin: 0, padding: 8, background: color,
                color: '#fff', borderRadius: 4
            }}>{label}</h2>
            <DroppableItem id={id}>
                {items.map((item, index) => (
                    <DroppableItem.Item
                        key={item.id}
                        item={item}
                        containerId={id}
                        index={index}
                    />
                ))}
            </DroppableItem>
        </div>
    );
}