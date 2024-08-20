import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { resetParams } from "@/redux/slices/filter-params-slice";

const Header: React.FC<{}> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div className="flex min-h-20 items-center justify-between">
      <div className="container p-0">
        <h2 className="text-lg font-bold">{t("Filter")}</h2>
      </div>
      <div className="container flex items-center justify-end p-0 text-xs">
        <button
          className="flex cursor-not-allowed items-center gap-2"
          onClick={() => dispatch(resetParams())}
          type="button"
        >
          <img
            src="/images/reload.svg"
            className="size-3"
            alt={t("Clear_Filters")}
          />
          {t("Clear_Filters")}
        </button>
      </div>
    </div>
  );
};

export { Header };
