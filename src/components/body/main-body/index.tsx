import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { ENV } from "@/components/const/env.const";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCards, setFilteredCards } from "@/redux/slices/cards-slice";

import { Card } from "./card";
import { Header } from "./header";

export function MainBody() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);
  const { cards, filteredCards } = useAppSelector((state) => state.cards);
  const filterParams = useAppSelector((state) => state.filterParams);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${ENV.VITE_SERVER_DOMAIN}/cards`);
        if (!response.ok) {
          throw new Error(t("Network_Response_Was_Not_Ok"));
        }

        const data = await response.json();

        dispatch(setCards(data));
      } catch (error) {
        setIsError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, t]);

  useEffect(() => {
    if (filterParams) {
      const { hitsPerPage = 16, sortBy, currentPage, brand } = filterParams;

      let sortedCards = [...cards].sort((a, b) => {
        switch (sortBy) {
          case "instant_search_price_asc":
            return a.price - b.price;
          case "instant_search_price_desc":
            return b.price - a.price;
          default:
            return 0;
        }
      });

      if (brand.length > 0) {
        sortedCards = sortedCards.filter((card) =>
          brand.includes(card.brand as string),
        );
      }

      const updatedFilteredCards = sortedCards.slice(
        (currentPage - 1) * hitsPerPage,
        currentPage * hitsPerPage,
      );

      dispatch(setFilteredCards(updatedFilteredCards));
    }
  }, [filterParams, dispatch, cards]);

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
    <div className="container m-0 max-w-[948px] p-0">
      <header className=" border-b-2 border-inherit p-0 ">
        <Header />
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredCards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
}
