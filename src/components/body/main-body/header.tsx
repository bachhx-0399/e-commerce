import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { Select } from "@/components/common/select";
import { useAppSelector } from "@/redux/hooks";
import { setHitsPerPage, setSortBy } from "@/redux/slices/filter-params-slice";

const Header: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const filterParams = useAppSelector((state) => state.filterParams);

  const { t } = useTranslation();

  const handleSortChange = (value: string) => {
    dispatch(setSortBy(value));
  };

  const handleHitsPerPageChange = (value: string) => {
    dispatch(setHitsPerPage(Number(value)));
  };

  return (
    <div className="flex min-h-20 items-center justify-end">
      <div className="h-4 w-28 rounded-md focus:outline-none">
        <Select
          value={filterParams.sortBy || "instant_search"}
          onChange={(e: { target: { value: string } }) =>
            handleSortChange(e.target.value)
          }
          options={[
            { label: t("Sort_By_Featured"), value: "instant_search" },
            { label: t("Price_Ascending"), value: "instant_search_price_asc" },
            {
              label: t("Price_Descending"),
              value: "instant_search_price_desc",
            },
          ]}
        />
      </div>
      <div className="ml-12 h-4 w-28 rounded-md focus:outline-none">
        <Select
          defaultValue={filterParams.hitsPerPage || 16}
          onChange={(e: { target: { value: string } }) =>
            handleHitsPerPageChange(e.target.value)
          }
          options={[
            { label: t("16_Hits_Per_Page"), value: "16" },
            { label: t("32_Hits_Per_Page"), value: "32" },
            { label: t("64_Hits_Per_Page"), value: "64" },
          ]}
        />
      </div>
    </div>
  );
};

export { Header };
