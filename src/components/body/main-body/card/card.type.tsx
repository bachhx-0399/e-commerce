interface CardProps {
  name: string;
  description: string;
  categories: string[];
  image: string;
  price: number;
  rating: number;
  free_shipping: boolean;
  brand?: string;
}

export type { CardProps };
