import { Search, X } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <Search
        size={18}
        className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-gray-400
        "
      />

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="
          w-full
          pl-10
          pr-10
          py-3
          rounded-xl
          border
          border-gray-200
          bg-white
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          transition
        "
      />

      {/* Clear Button */}
      {value && (
        <button
          onClick={handleClear}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-gray-400
            hover:text-red-500
            transition
          "
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}