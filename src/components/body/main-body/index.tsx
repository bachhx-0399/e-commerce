import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { ENV } from "@/components/const/env.const";
import { MAX_PRICE, MIN_PRICE } from "@/components/const/price-range-const";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCards, setFilteredCards } from "@/redux/slices/cards-slice";
import {
  setCurrentPage,
  setTotalPages,
} from "@/redux/slices/filter-params-slice";

import { Card } from "./card";
import { Header } from "./header";
import { Pagination } from "./pagination";

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
      const {
        query,
        hitsPerPage = 16,
        sortBy,
        currentPage,
        category,
        brand,
        freeShipping,
        rangeValues,
        rating,
        totalPages,
      } = filterParams;

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

      if (freeShipping) {
        sortedCards = sortedCards.filter((card) => card.free_shipping);
      }

      const [min, max] = rangeValues;
      if (min !== MIN_PRICE || max !== MAX_PRICE) {
        sortedCards = sortedCards.filter(
          (card) => card.price >= min && card.price <= max,
        );
      }

      if (rating) {
        sortedCards = sortedCards.filter((card) => card.rating >= rating);
      }

      if (category !== "") {
        const categories = decodeURIComponent(category).split("/");
        sortedCards = sortedCards.filter((card) =>
          // all element of categories must be in card.categories
          categories.every((ctg) => card.categories.includes(ctg)),
        );
      }

      if (query !== "") {
        const lowerCaseQuery = query.toLowerCase();

        sortedCards = sortedCards.filter((card) => {
          const lowerCaseName = card.name.toLowerCase();
          const lowerCaseDescription = card.description.toLowerCase();

          return (
            lowerCaseName.includes(lowerCaseQuery) ||
            lowerCaseDescription.includes(lowerCaseQuery)
          );
        });
      }

      const updatedFilteredCards = sortedCards.slice(
        (currentPage - 1) * hitsPerPage,
        currentPage * hitsPerPage,
      );

      // Rounded up
      const updateTotalPage = Math.ceil(sortedCards.length / hitsPerPage);

      dispatch(setFilteredCards(updatedFilteredCards));
      dispatch(setTotalPages(updateTotalPage));

      if (totalPages !== updateTotalPage) {
        dispatch(setCurrentPage(1));
      }
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
      <div className="flex flex-col items-center">
        {filterParams.totalPages > 1 && <Pagination />}
      </div>
    </div>
  );
}
