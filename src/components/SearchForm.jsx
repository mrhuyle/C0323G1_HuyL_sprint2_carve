import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

const SearchForm = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    onSearch(searchInput);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="relative flex items-center"
    >
      <input
        className="h-10 pr-6 text-sm bg-gray-100 border-2 rounded text-brandPrimary border-brandPrimary px-9 w-26 focus:outline-none placeholder:text-brandPrimary"
        type="text"
        name="search"
        placeholder="Bạn cần tìm gì?"
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
      />
      <div className="absolute text-blue-800 opacity-100 left-3">
        <BsSearch size={15} />
      </div>
    </form>
  );
};

export default SearchForm;
