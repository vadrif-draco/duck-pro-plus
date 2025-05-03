export interface Duck {
  id: string;
  name: string;
  scientificName?: string;
  description?: string;
  imageUrl: string;
  habitat: string;
  facts: string[];
  isEndangered: boolean;
  isFeatured?: boolean;
}
