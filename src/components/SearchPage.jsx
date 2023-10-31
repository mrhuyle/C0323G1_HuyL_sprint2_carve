import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as deckServices from "../services/deckServices";
import MyFooter from "./MyFooter";
import Navbar from "./Navbar";
import MyPagination from "./MyPagination";
import ProductCard from "./ProductCard";
import HavingNoResults from "../components/HavingNoResults";

const SearchPage = () => {
  const params = useParams();
  const [decks, setDecks] = useState([]);
  const [keyword, setKeyword] = useState(params.keyword || "");
  const [sortBy, setSortBy] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [displayKeyword, setDisplayKeyword] = useState(params.keyword);
  const [isNoContent, setIsNoContent] = useState(false);

  const getDecks = async () => {
    setIsNoContent(false);
    try {
      const response = await deckServices.getDecksWithPagination(
        currentPage - 1,
        pageSize,
        keyword,
        sortBy,
        sortDirection
      );
      console.log(response.data.content);
      console.log(response.status);
      if (response.status === 204) {
        setIsNoContent(true);
      } else {
        setDecks(response.data.content);
        setTotalElements(response.data.totalElements);
        setDisplayKeyword(keyword);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (searchInput) => {
    let result = searchInput.trim().replace(/" "/g, "");
    setKeyword(result);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortDirectionChange = (event) => {
    setSortDirection(event.target.value);
  };

  useEffect(() => {
    setCurrentPage(1);
    getDecks();
  }, [keyword]);

  useEffect(() => {
    getDecks();
  }, [currentPage, sortBy, sortDirection]);

  const totalPages = Math.ceil(totalElements / pageSize);

  return (
    <>
      <Navbar onSearch={handleSearch} inputSearch={keyword} />
      {!isNoContent ? (
        <div className="relative px-4 py-10 mx-auto bg-gray-100 md:px-14 max-w-screen-2xl">
          <div className="pt-3 pb-2 mx-auto mt-10 mb-5 italic font-extrabold leading-relaxed text-center bg-indigo-100 rounded-2xl md:w-1/2">
            <h2 className="mb-3 text-4xl font-semibold text-brandPrimary head-title">
              KẾT QUẢ TÌM KIẾM
            </h2>
          </div>

          <div className="mb-3 text-lg leading-loose ms-5 text-brandPrimary">
            Có {totalElements} kết quả tìm kiếm với từ khoá{" "}
            {`"${displayKeyword}"`}
          </div>
          <div className="flex items-center gap-3 mb-3 ms-5 text-brandPrimary">
            <span>Sắp xếp theo: </span>
            <select
              className="rounded"
              value={sortBy}
              onChange={handleSortByChange}
            >
              <option value="price">Giá</option>
              <option value="createdTime">Ngày tạo</option>
            </select>

            <span>Cách sắp xếp: </span>
            <select
              className="rounded"
              value={sortDirection}
              onChange={handleSortDirectionChange}
            >
              <option value="asc">Tăng dần</option>
              <option value="desc">Giảm dần</option>
            </select>
          </div>
          <div className="grid grid-cols-5 gap-4 px-5">
            {decks?.map((deck, index) => (
              <ProductCard key={index} product={deck} tagName={deck.tagName} />
            ))}
          </div>
          <div className="flex items-center justify-center mt-5">
            <MyPagination
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              totalPages={totalPages}
            />
          </div>
        </div>
      ) : (
        <div className="relative px-4 py-10 mx-auto bg-gray-100 md:px-14 max-w-screen-2xl">
          <div className="pt-3 pb-2 mx-auto mt-10 mb-5 italic font-extrabold leading-relaxed text-center bg-indigo-100 rounded-2xl md:w-1/2">
            <h2 className="mb-3 text-4xl font-semibold text-brandPrimary head-title">
              KẾT QUẢ TÌM KIẾM
            </h2>
          </div>
          <div className="flex items-center justify-center">
            <HavingNoResults />
          </div>
          x
        </div>
      )}

      <MyFooter />
    </>
  );
};

export default SearchPage;
