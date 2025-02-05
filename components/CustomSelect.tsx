import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import classNames from "classnames";

interface CustomSelectProps {
  label?: string;
  options: { label: string; value: string; colorClass?: string }[];
  value: string;
  onChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-auto place-items-center border rounded-md p-2">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent className="bg-white border shadow-md rounded-md">
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="px-3 py-2 flex items-center justify-between"
            >
              {!option.colorClass && <span>{option.label}</span>}
              {option.colorClass && (
                <Badge
                  className={classNames(
                    option.colorClass, // bg-purple-500 o bg-sky-300
                    "px-2 py-1 rounded-xl text-xs"
                  )}
                >
                  {option.label}
                </Badge>
              )}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
