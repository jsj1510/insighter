import React from "react";

interface SearchProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  performSearch: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({
  searchQuery,
  onSearchChange,
  performSearch,
  handleKeyPress,
}) => (
  <div style={{ margin: 20 }}>
    <input
      type="text"
      value={searchQuery}
      onChange={onSearchChange}
      onKeyPress={handleKeyPress}
    />
    <button onClick={performSearch}>검색</button>
  </div>
);

export default Search;
