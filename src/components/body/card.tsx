import { useTranslation } from "react-i18next";

export function Card() {
  const { t } = useTranslation();

  return (
    <div className="max-w-sm overflow-hidden">
      <header className="flex aspect-square items-center justify-center">
        <img
          className="max-w-[174px]"
          src="https://cdn-demo.algolia.com/bestbuy-0118/5588602_sb.jpg"
          alt="Dell - Inspiron 15.6; Touch-Screen Laptop - Intel Core i5 - 6GB Memory - 1TB Hard Drive - Black"
        />
      </header>
      <div className="m-0 p-0">
        <div className="mb-2 mt-3 text-xs font-semibold uppercase text-[#21243d] opacity-70">
          Computers & Tablets
        </div>
        <h1>
          <span className="text-sm font-bold leading-5 text-[#21243d]">
            Dell - Inspiron 15.6 Touch-Screen Laptop - Intel Core i5 - 6GB
            Memory - 1TB Hard Drive - Black
          </span>
        </h1>
        <p className="mb-3.5 mt-0.5 text-sm leading-5">
          <span>
            Dell Inspiron Laptop: Get speed and performance from this 15 …
          </span>
        </p>
        <footer>
          <p className="flex items-center space-x-1 text-[14px] leading-5">
            <span className="text-yellow-500">$</span>
            <strong>499.99</strong>
            <span className="mx-1 box-border inline-flex size-auto items-center gap-1 rounded-sm border border-yellow-500 px-1 text-[11px] text-yellow-500">
              <img
                src="/images/start.svg"
                className="size-2"
                alt={t("ratingScore")}
              />
              4
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
}
