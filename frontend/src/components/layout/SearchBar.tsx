import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import type { SearchBarProps } from "@/lib/types/faq";

export default function SearchBar({ 
  value, 
  onChange, 
  onClear, 
  placeholder = "Tìm kiếm..." 
}: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-10 bg-white text-black"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}