import { Option } from "@/components/common/option";

import type { SelectProps } from "./select.type";

const Select: React.FC<SelectProps> = ({ options, ...rest }) => {
  return (
    <select
      className="block w-full text-xs font-normal opacity-70 focus:border-indigo-500 focus:ring-indigo-500"
      {...rest}
    >
      {options &&
        options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
    </select>
  );
};

export { Select };
