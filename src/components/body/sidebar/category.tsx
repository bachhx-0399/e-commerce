import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { useAppDispatch } from "@/redux/hooks";
import { setCategory } from "@/redux/slices/filter-params-slice";

import { CategoryList } from "./category-list";
import type { CategoryProps } from "./category-props.type";

const Category: React.FC<{ categories: CategoryProps[] }> = ({
  categories,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const location = useLocation(); // Get the current location
  const [currentPath, setCurrentPath] = useState<string[]>([]);

  useEffect(() => {
    // Get current path from URL and split by "/"
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];
    const decodedPath = lastSegment
      ? decodeURIComponent(lastSegment).replace(/\+/g, " ").split("/")
      : [];

    setCurrentPath(decodedPath);
  }, [location]);

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
