interface CategoryProps {
  isActive?: boolean;
  fullPath?: string[];
  name: string;
  count: number;
  subCategory: CategoryProps[];
}

export type { CategoryProps };
