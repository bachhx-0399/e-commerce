import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ENV } from "@/components/const/env.const";
import { MAX_PRICE, MIN_PRICE } from "@/components/const/price-range-const";
import { useAppSelector } from "@/redux/hooks";

import { Brands } from "./brands";
import { Category } from "./category";
import type { CategoryProps } from "./category-props.type";
import { FreeShipping } from "./free-shipping";
import { Header } from "./header";
import { Price } from "./price";
import { Ratings } from "./ratings";

export function Sidebar() {
  const [data, setData] = useState<CategoryProps[]>([]);
  const filterParams = useAppSelector((state) => state.filterParams);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${ENV.VITE_SERVER_DOMAIN}/categories`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const categoryData: CategoryProps[] = await response.json();

        setData(categoryData);
      } catch (error) {
        setIsError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Use effect to update params whenever filterParams change
  useEffect(() => {
    if (filterParams) {
      const {
        category,
        hitsPerPage,
        sortBy,
        brand,
        rangeValues,
        freeShipping,
        rating,
        currentPage,
      } = filterParams;

      const searchParams = new URLSearchParams();
      if (hitsPerPage !== undefined && hitsPerPage !== 16) {
        searchParams.set("hitsPerPage", hitsPerPage.toString());
      }
      if (sortBy !== undefined && sortBy !== "instant_search") {
        searchParams.set("sortBy", sortBy);
      }

      if (brand.length > 0) {
        brand.forEach((value) => {
          searchParams.append("brands", value);
        });
      }

      const [min, max] = rangeValues;
      if (min !== MIN_PRICE || max !== MAX_PRICE) {
        searchParams.set("price", `${min}-${max}`);
      }

      if (freeShipping) {
        searchParams.set("free_shipping", "true");
      }

      if (rating) {
        searchParams.set("rating", rating.toString());
      }

      if (currentPage !== 1) {
        searchParams.set("page", currentPage.toString());
      }

      // Update the URL with new params
      navigate(
        `/examples/react/e-commerce/search/${category}?${searchParams.toString()}`,
      );
    }
  }, [filterParams, navigate]);

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
    <div className="container p-0">
      <div className="container border-b-2 border-inherit p-0">
        <Header />
      </div>
      <div className="container flex flex-col p-0 py-8">
        <Category categories={data} />
        <Brands />
        <Price />
        <FreeShipping />
        <Ratings />
      </div>
    </div>
  );
}
