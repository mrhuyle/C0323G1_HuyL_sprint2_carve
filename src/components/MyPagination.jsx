import React from "react";

import { Pagination } from "flowbite-react";

const MyPagination = ({ currentPage, handlePageChange, totalPages }) => {
  return (
    <Pagination
      currentPage={currentPage}
      onPageChange={handlePageChange}
      showIcons
      totalPages={totalPages}
    />
  );
};

export default MyPagination;
