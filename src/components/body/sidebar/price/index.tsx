import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getTrackBackground, Range } from "react-range";

import {
  MAX_PRICE,
  MIN_PRICE,
  SELECTED_RANGE_COLOR,
  STEP,
  UNSELECTED_RANGE_COLOR,
} from "@/components/const/price-range-const";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setRangeValues } from "@/redux/slices/filter-params-slice";

const Price: React.FC<{}> = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { rangeValues } = useAppSelector((state) => state.filterParams);
  const min = MIN_PRICE;
  const max = MAX_PRICE;

  useEffect(() => {
    dispatch(setRangeValues([min, max]));
  }, [min, max, dispatch]);

  const handlePriceChange = (values: number[]) => {
    dispatch(setRangeValues(values));
  };

  return (
    <div className="container m-0 border-b-2 border-inherit px-0 py-8">
      <div className="pb-4 font-serif text-[12px] font-semibold leading-4 text-[#21243d]">
        {t("Price")}
      </div>
      <div className="container relative m-0 flex flex-col justify-start p-0">
        <Range
          step={STEP}
          min={min}
          max={max}
          values={rangeValues}
          onChange={(values) => handlePriceChange(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-0.5 w-full rounded"
              style={{
                background: getTrackBackground({
                  values: rangeValues,
                  colors: [
                    UNSELECTED_RANGE_COLOR,
                    SELECTED_RANGE_COLOR,
                    UNSELECTED_RANGE_COLOR,
                  ],
                  min,
                  max,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              className="size-4 rounded-full bg-white drop-shadow-lg"
            />
          )}
        />
        <div className="mt-2 flex justify-between text-sm">
          <span>
            <span className="text-yellow-500">$</span>
            {rangeValues[0]}
          </span>
          <span>
            <span className="text-yellow-500">$</span>
            {rangeValues[1]}
          </span>
        </div>
      </div>
    </div>
  );
};

export { Price };
