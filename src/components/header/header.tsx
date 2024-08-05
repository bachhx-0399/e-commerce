import { useState } from "react";
import { useTranslation } from "react-i18next";

export function Header() {
  const [searchValue, setSearchValue] = useState<string>("");
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <header className="header-backgound flex h-96 w-full flex-col items-center justify-center bg-yellow-600 bg-auto px-16 py-8">
      <p className="flex justify-center">
        <a href="https://www.algolia.com/">
          <img
            src="/images/algolia.svg"
            width={92}
            height={24}
            alt={t("algoliaHeaderIconAlt")}
          />
        </a>
      </p>
      <p className="my-9 flex justify-center text-5xl font-thin text-white">
        {t("headerTitle")}
      </p>
      <div className="mx-auto w-1/2">
        <div className="relative flex h-14 w-full items-center overflow-hidden rounded-lg bg-white focus-within:shadow-lg">
          <div className="grid h-full w-12 place-items-center text-yellow-400">
            <img
              src="/images/search.svg"
              className="size-6"
              alt={t("searchHeaderIconAlt")}
            />
          </div>
          <input
            className="peer size-full pr-2 text-sm text-gray-700 outline-none placeholder:text-gray-300"
            type="text"
            id="search"
            placeholder={t("headerSearchPlaceholder")}
            value={searchValue}
            onChange={handleChange}
          />
        </div>
      </div>
    </header>
  );
}
