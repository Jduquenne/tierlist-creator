import DroppableItem from './DroppableItem';
import type { Item } from '../types/models';

interface Props {
    items: Item[];
}

export default function PaletteContainer({ items }: Props) {
    return (
        <div style={{ marginTop: 32 }}>
            <h2>Palette d’images</h2>
            <DroppableItem id="unplaced">
                {items.map((item, index) => (
                    <DroppableItem.Item
                        key={item.id}
                        item={item}
                        containerId="unplaced"
                        index={index}
                    />
                ))}
            </DroppableItem>
        </div>
    );
}