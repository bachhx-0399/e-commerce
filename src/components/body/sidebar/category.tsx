import { useState } from "react";
import { useTranslation } from "react-i18next";

interface CategoryProps {
  name: string;
  count: number;
  subCategory: CategoryProps[];
}

const CategoryList: React.FC<{ categories: CategoryProps[] }> = ({
  categories,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const { t } = useTranslation();

  return (
    <ul className="ml-3.5">
      {categories.map((category, index) => (
        <li key={index}>
          <div
            className="container m-0 flex cursor-pointer items-center space-x-2 p-0 pb-4"
            onClick={() => handleToggle(index)}
          >
            <img
              src={
                openIndex === index
                  ? "/images/caret-down.svg"
                  : "/images/caret-up.svg"
              }
              alt={openIndex === index ? t("Collapse") : t("Expand")}
              height={8}
              width={8}
            />
            <span className="text-sm leading-5">{category.name}</span>
            <span className="ml-2 rounded bg-[#41424714] px-1 font-sans text-[11px] font-medium">
              {category.count}
            </span>
          </div>
          {category.subCategory.length > 0 && openIndex === index && (
            <CategoryList categories={category.subCategory} />
          )}
        </li>
      ))}
    </ul>
  );
};

const Category: React.FC<{ categories: CategoryProps[] }> = ({
  categories,
}) => {
  const { t } = useTranslation();

  return (
    <div className="container m-0 p-0">
      <div className="pb-4 font-serif text-[12px] font-semibold leading-4 text-[#21243d]">
        {t("Category")}
      </div>
      <div className="container m-0 p-0">
        <CategoryList categories={categories} />
      </div>
    </div>
  );
};

export { Category };
export type { CategoryProps };
