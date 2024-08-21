import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import type { CategoryProps } from "./category-props.type";

const CategoryList: React.FC<{
  categories: CategoryProps[];
  currentPath: string[];
  parentPath: string[];
  onCategoryClick: (fullPath: string[]) => void;
}> = ({ categories, currentPath, parentPath, onCategoryClick }) => {
  const [updatedCategories, setUpdatedCategories] = useState<CategoryProps[]>(
    [],
  );
  const { t } = useTranslation();

  useEffect(() => {
    const newCategories = categories.map((category) => {
      const fullPath = [...parentPath, category.name];
      const isActive = currentPath.includes(category.name);
      return { ...category, fullPath, isActive };
    });

    setUpdatedCategories(newCategories);
  }, [categories, currentPath, parentPath]);

  return (
    <ul className="ml-3.5">
      {updatedCategories.map((category, index) => (
        <li
          key={index}
          style={{ fontWeight: category.isActive ? "bold" : "normal" }}
        >
          <div
            className="container m-0 flex cursor-pointer items-center space-x-2 p-0 pb-4"
            onClick={() => onCategoryClick(category.fullPath || [])}
            role="presentation"
          >
            <img
              src={
                category.isActive
                  ? "/images/caret-down.svg"
                  : "/images/caret-up.svg"
              }
              alt={category.isActive ? t("Collapse") : t("Expand")}
              height={8}
              width={8}
            />
            <span className="text-sm leading-5" role="presentation">
              {category.name}
            </span>
            <span className="ml-2 rounded bg-[#41424714] px-1 font-sans text-[11px] font-medium">
              {category.count}
            </span>
          </div>
          {category.subCategory.length > 0 && category.isActive && (
            <CategoryList
              categories={category.subCategory}
              currentPath={currentPath}
              parentPath={category.fullPath || []}
              onCategoryClick={onCategoryClick}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export { CategoryList };
