import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setRating } from "@/redux/slices/filter-params-slice";

import type { RatingStartProps } from "./ratings.type";

const RatingStart: React.FC<RatingStartProps> = ({ rating, count }) => {
  const fullStars = Math.floor(rating);
  const { t } = useTranslation();
  const emptyStars = 5 - fullStars;
  const dispatch = useAppDispatch();
  const { rating: selectedRating } = useAppSelector(
    (state) => state.filterParams,
  );

  const handleOnClick = () => {
    dispatch(setRating(rating));
  };

  return (
    <ul
      className={`flex items-center gap-2 ${selectedRating === rating ? "opacity-100" : "opacity-50"}`}
      onClick={() => handleOnClick()}
      role="presentation"
    >
      {[...Array(fullStars)].map((_, index) => (
        <li key={index} className="text-yellow-500">
          <img src="/images/yellow-start.svg" alt={t("Start")} />
        </li>
      ))}

      {[...Array(emptyStars)].map((_, index) => (
        <li key={index} className="text-gray-300">
          <img src="/images/white-start.svg" alt={t("Start")} />
        </li>
      ))}

      <span className="ml-2 rounded bg-[#41424714] px-1 font-sans text-[11px] font-medium opacity-75">
        {count}
      </span>
    </ul>
  );
};

export { RatingStart };
