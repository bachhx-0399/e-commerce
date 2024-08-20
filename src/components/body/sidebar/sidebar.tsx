import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/redux/hooks";

import { Category } from "./category";
import type { CategoryProps } from "./category-props.type";
import { Header } from "./header";

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
        const response = await fetch("/api/category-data.json");
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
      const { category, hitsPerPage, sortBy } = filterParams;

      const searchParams = new URLSearchParams();
      if (hitsPerPage !== undefined && hitsPerPage !== 16) {
        searchParams.set("hitsPerPage", hitsPerPage.toString());
      }
      if (sortBy !== undefined && sortBy !== "instant_search") {
        searchParams.set("sortBy", sortBy);
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
      <div className="container flex p-0 py-8">
        <Category categories={data} />
      </div>
    </div>
  );
}
