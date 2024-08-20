import { useEffect, useState } from "react";

import { Highlight } from "@/components/common/highlight";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBrand } from "@/redux/slices/filter-params-slice";

import type { CheckboxProps } from "./checkbox.type";

const BranchCheckbox: React.FC<CheckboxProps> = ({
  label,
  count,
  searchTerm,
  ...props
}) => {
  const brands = useAppSelector((state) => state.filterParams.brand);
  const [isChecked, setIsChecked] = useState(brands.includes(label));
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsChecked(brands.includes(label));
  }, [brands, label]);

  const handleToggle = () => {
    if (isChecked) {
      dispatch(setBrand(brands.filter((brand) => brand !== label)));
    } else {
      dispatch(setBrand([...brands, label]));
    }
    setIsChecked(!isChecked);
  };

  return (
    <div className="inline-flex items-center">
      <label
        className="relative flex cursor-pointer items-center rounded-full p-3 pl-0"
        htmlFor="green"
      >
        <input
          type="checkbox"
          className="peer relative size-5 cursor-pointer appearance-none rounded-sm border transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:size-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-amber-500 checked:bg-amber-500 checked:before:bg-amber-500"
          id="green"
          checked={isChecked}
          {...props}
          onChange={handleToggle}
        />
        <span className="pointer-events-none absolute left-[32%] top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
          <img
            src="/images/dot.svg"
            alt="check"
            className="size-1.5 text-white"
          />
        </span>
      </label>
      <div
        className="container m-0 flex cursor-pointer items-center space-x-2 p-0"
        role="presentation"
      >
        <span
          className={`text-sm text-slate-800 ${isChecked ? "font-bold" : "font-medium"}`}
        >
          <Highlight text={label} searchTerm={searchTerm || ""} />
        </span>
        <span className="ml-2 rounded bg-[#41424714] px-1 font-sans text-[11px] font-medium">
          {count}
        </span>
      </div>
    </div>
  );
};

export { BranchCheckbox };
