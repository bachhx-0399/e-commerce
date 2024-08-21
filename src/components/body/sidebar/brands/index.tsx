import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { BranchCheckbox } from "@/components/common/checkbox";
import { ENV } from "@/components/const/env.const";
import useDebounce from "@/components/custom-hook/use-debounce";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBrands, setFilteredBrands } from "@/redux/slices/brands-slices";

import type { BrandsProps } from "./brands.type";

const Brands: React.FC<{}> = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const { brands, filteredBrands, limitedBrands } = useAppSelector(
    (state) => state.brands,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${ENV.VITE_SERVER_DOMAIN}/brands`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const brandsData: BrandsProps[] = await response.json();

        dispatch(setBrands(brandsData));
      } catch (error) {
        setIsError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const filteredBrandList = debouncedSearchValue
      ? brands.filter((brand) =>
          brand.name.toLowerCase().includes(debouncedSearchValue.toLowerCase()),
        )
      : brands;

    dispatch(setFilteredBrands(filteredBrandList.slice(0, limitedBrands)));
  }, [debouncedSearchValue, brands, dispatch, limitedBrands]);

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
    <div className="container m-0 p-0">
      <div className="pb-4 font-serif text-[12px] font-semibold leading-4 text-[#21243d]">
        {t("Brands")}
      </div>
      <div className="container relative m-0 flex flex-col justify-start p-0">
        <div className="">
          <div className="relative flex h-10 w-full items-center overflow-hidden rounded">
            <div className="absolute bottom-0 left-0 grid h-full w-12 place-items-center">
              <img
                src="/images/search.svg"
                className="size-3"
                alt={t("Search_Header_Icon_Alt")}
              />
            </div>
            <input
              className="peer size-full bg-neutral-700/[.06] px-11 py-1 text-sm font-normal text-[#21243D]/[.8] outline-0"
              type="text"
              placeholder={t("Sidebar_Search_Branch_Placeholder")}
              value={searchValue}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="container flex flex-col p-0">
          {filteredBrands &&
            filteredBrands.map((brand) => (
              <BranchCheckbox
                key={brand.name}
                label={brand.name}
                count={brand.count}
                searchTerm={searchValue}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export { Brands };
