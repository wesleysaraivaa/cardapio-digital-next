export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_id: string;
  is_active: boolean;
}

export interface ProductListProps {
  products: Product[];
}
