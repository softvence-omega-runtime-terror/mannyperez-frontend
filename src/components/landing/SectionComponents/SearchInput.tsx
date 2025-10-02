import { useState } from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder = "Search...", onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-96 rounded-2xl border border-border bg-primary-foreground py-3 pl-10 pr-4 focus:border-accent  focus:outline-none"
      />
      <button
        type="submit"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-accent"
      >
        <Search size={18} />
      </button>
    </form>
  );
};

export default SearchInput;
