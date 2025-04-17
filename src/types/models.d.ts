export interface Item {
  id: string;
  label?: string;
  imageSrc: string;
}

export interface Rank {
  id: string;
  label: string;
  color: string;
  items: Item[];
}

export interface TierList {
  title: string;
  ranks: Rank[];
  unplacedItems: Item[];
}
