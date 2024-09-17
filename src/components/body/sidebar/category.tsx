import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCategory } from "@/redux/slices/filter-params-slice";

import { CategoryList } from "./category-list";
import type { CategoryProps } from "./category-props.type";

const Category: React.FC<{ categories: CategoryProps[] }> = ({
  categories,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { category } = useAppSelector((state) => state.filterParams);

  const [currentPath, setCurrentPath] = useState<string[]>([]);

  useEffect(() => {
    // Get current path from URL and split by "/"
    const pathSegments = category
      ? decodeURIComponent(category).split("/")
      : [];
    setCurrentPath(pathSegments);
  }, [category]);

  const handleCategoryClick = (fullPath: string[]) => {
    const path = fullPath.join("/");

    // Encode the path for URL
    const encodedPath = encodeURIComponent(path);
    dispatch(setCategory(encodedPath));
  };

  return (
    <div className="container m-0 border-b-2 border-inherit px-0 py-8">
      <div className="pb-4 font-serif text-[12px] font-semibold leading-4 text-[#21243d]">
        {t("Category")}
      </div>
      <div className="container m-0 p-0">
        <CategoryList
          categories={categories}
          currentPath={currentPath}
          onCategoryClick={handleCategoryClick}
          parentPath={[]}
        />
      </div>
    </div>
  );
};

export { Category };
