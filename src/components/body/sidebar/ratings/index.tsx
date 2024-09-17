import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { ENV } from "@/components/const/env.const";
import { useAppDispatch } from "@/redux/hooks";

import { RatingStart } from "./rating-start";
import type { RatingStartProps } from "./ratings.type";

const Ratings: React.FC<{}> = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [ratingData, setRatingData] = useState<RatingStartProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${ENV.VITE_SERVER_DOMAIN}/ratings`);
        if (!response.ok) {
          throw new Error(t("Network_Response_Was_Not_Ok"));
        }

        const data = await response.json();

        setRatingData(data);
      } catch (error) {
        setIsError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, t]);

  if (loading) {
    return <div>{t("Loading_Ellipsis")}</div>;
  }

  if (isError) {
    return (
      <div>
        {t("Error")}: {isError}
      </div>
    );
  }

  return (
    <div className="container m-0 px-0 py-8">
      <div className="pb-4 font-serif text-[12px] font-semibold leading-4 text-[#21243d]">
        {t("Ratings")}
      </div>
      <div className="container relative m-0 flex flex-col justify-start gap-3 p-0">
        {ratingData
          .sort((a, b) => b.rating - a.rating)
          .map((rating) => (
            <RatingStart key={rating.rating} {...rating} />
          ))}
      </div>
    </div>
  );
};

export { Ratings };
