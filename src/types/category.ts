export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface CategoryListProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
} 