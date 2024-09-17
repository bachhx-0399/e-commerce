import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setFreeShipping } from "@/redux/slices/filter-params-slice";

const FreeShipping: React.FC<{}> = () => {
  const { t } = useTranslation();
  const { freeShipping } = useAppSelector((state) => state.filterParams);

  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(setFreeShipping(!freeShipping));
  };

  return (
    <div className="container m-0 max-w-64 border-b-2 border-inherit px-0 py-8">
      <div className="pb-4 font-serif text-[12px] font-semibold leading-4 text-[#21243d]">
        {t("Free_Shipping")}
      </div>
      <div className="container relative m-0 flex justify-start gap-3 p-0">
        <span className="grow-[2] text-wrap">
          {t("Display_Only_Items_With_Free_Shipping")}
        </span>
        <label
          className="inline-flex grow cursor-pointer items-center"
          htmlFor="free-shipping"
        >
          <span
            className={`pr-2 text-sm font-medium ${
              freeShipping ? "text-yellow-500" : "text-gray-800"
            }`}
          >
            {freeShipping ? t("Yes") : t("No")}
          </span>
          <input
            type="checkbox"
            checked={freeShipping}
            onChange={handleToggle}
            className="peer sr-only"
            id="free-shipping"
          />
          <div
            className={`relative h-6 w-11 rounded-full ${
              freeShipping ? "bg-yellow-500" : "bg-gray-200"
            } peer-checked:bg-yellow-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800`}
          >
            <div
              className={`absolute top-[2px] ${
                freeShipping ? "start-[25px]" : "start-[2px]"
              } size-5 rounded-full border border-gray-300 bg-white transition-all`}
            />
          </div>
        </label>
      </div>
    </div>
  );
};

export { FreeShipping };
