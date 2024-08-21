import { useTranslation } from "react-i18next";

import { Highlight } from "@/components/common/highlight";
import { useAppSelector } from "@/redux/hooks";

import type { CardProps } from "./card.type";

const Card: React.FC<CardProps> = ({
  name,
  description,
  price,
  categories,
  image,
  rating,
}) => {
  const { t } = useTranslation();
  const query = useAppSelector((state) => state.filterParams.query);

  return (
    <div className="max-w-sm overflow-hidden">
      <header className="flex aspect-square items-center justify-center">
        <img className="max-w-[174px]" src={image} alt={name} />
      </header>
      <div className="m-0 p-0">
        <div className="mb-2 mt-3 text-xs font-semibold uppercase text-[#21243d] opacity-70">
          {categories[0] || t("Do_Not_Have_Category")}
        </div>
        <h1>
          <span className="text-sm font-bold leading-5 text-[#21243d]">
            {/* {name} */}
            <Highlight text={name} searchTerm={query} />
          </span>
        </h1>
        <p className="mb-3.5 mt-0.5 text-sm leading-5">
          {/* <span>{description}</span> */}
          <Highlight text={description} searchTerm={query} truncate />
        </p>
        <footer>
          <p className="flex items-center space-x-1 text-[14px] leading-5">
            <span className="text-yellow-500">$</span>
            <strong>{price}</strong>
            <span className="mx-1 box-border inline-flex size-auto items-center gap-1 rounded-sm border border-yellow-500 px-1 text-[11px] text-yellow-500">
              <img
                src="/images/start.svg"
                className="size-2"
                alt={t("Rating_Score")}
              />
              {rating}
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export { Card };
