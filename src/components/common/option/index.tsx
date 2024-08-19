import type { OptionProps } from "./option.type";

const Option: React.FC<OptionProps> = ({ value, children, ...rest }) => {
  return (
    <option
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      value={value}
      {...rest}
    >
      {children}
    </option>
  );
};

export { Option };
