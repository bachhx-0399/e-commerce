import type { CategoryProps } from "./category";
import { Category } from "./category";
import categoryData from "./category-data.json";

export function Sidebar() {
  const data: CategoryProps[] = categoryData;

  return (
    <div className="container m-0 p-0">
      <div className="container">Filter</div>
      <div className="container flex">
        <Category categories={data} />
      </div>
    </div>
  );
}
