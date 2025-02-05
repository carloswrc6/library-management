import { Input } from "@/components/ui/input";
import Image from "next/image";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder,
}: SearchInputProps) {
  return (
    <div className="relative w-full max-w-4xl">
      <Image
        src="/icons/search-fill.svg"
        width={20}
        height={20}
        alt="Search Icon"
        className="absolute left-3 top-1/2 -translate-y-1/2"
      />
      <Input
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="pl-10 max-w-sm"
      />
    </div>
  );
}
