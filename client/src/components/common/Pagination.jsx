import React from "react";
import {
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">

      {/* Previous */}

      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`
          w-10
          h-10
          rounded-lg
          border
          flex
          items-center
          justify-center
          ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600 hover:text-white"
          }
        `}
      >
        <FaAngleLeft />
      </button>

      {/* Page Numbers */}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`
            w-10
            h-10
            rounded-lg
            transition
            ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "border hover:bg-blue-50"
            }
          `}
        >
          {page}
        </button>
      ))}

      {/* Next */}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`
          w-10
          h-10
          rounded-lg
          border
          flex
          items-center
          justify-center
          ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600 hover:text-white"
          }
        `}
      >
        <FaAngleRight />
      </button>

    </div>
  );
};

export default Pagination;