interface CardProps {
  name: string;
  description: string;
  categories: string[];
  image: string;
  price: number;
  rating: number;
  brand?: string;
}

export type { CardProps };
