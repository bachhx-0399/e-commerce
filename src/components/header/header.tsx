import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import useDebounce from "@/components/custom-hook/use-debounce";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setQuery } from "@/redux/slices/filter-params-slice";

export function Header() {
  const query = useAppSelector((state) => state.filterParams.query);
  const [searchValue, setSearchValue] = useState<string>(query);
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    dispatch(setQuery(debouncedSearchValue));
  }, [debouncedSearchValue, dispatch]);

  return (
    <header className="header-backgound bg-black-600 flex h-96 w-full flex-col items-center justify-center bg-auto py-8 md:px-0 lg:px-16">
      <p className="flex justify-center">
        <a href="https://www.algolia.com/">
          <img
            src="/images/algolia.svg"
            width={92}
            height={24}
            alt={t("Algolia_Header_Icon_Alt")}
          />
        </a>
      </p>
      <p className="my-9 flex justify-center font-thin text-white md:text-3xl lg:text-5xl">
        {t("Header_Title")}
      </p>
      <div className="w-5/6 lg:w-1/3">
        <div className="relative top-32 flex h-14 w-full items-center overflow-hidden rounded-lg bg-white shadow-xl backdrop-blur-lg focus-within:shadow-lg md:top-0 md:shadow-none md:blur-none">
          <div className="grid h-full w-12 place-items-center text-yellow-400">
            <img
              src="/images/search.svg"
              className="size-6"
              alt={t("Search_Header_Icon_Alt")}
            />
          </div>
          <input
            className="peer size-full pr-2 text-sm text-gray-700 outline-none placeholder:text-gray-300"
            type="text"
            id="search"
            placeholder={t("Header_Search_Placeholder")}
            value={searchValue}
            onChange={handleChange}
          />
        </div>
      </div>
    </header>
  );
}
