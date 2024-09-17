import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCurrentPage } from "@/redux/slices/filter-params-slice";

const Pagination: React.FC<{}> = () => {
  const currentPage = useAppSelector((state) => state.filterParams.currentPage);
  const totalPages = useAppSelector((state) => state.filterParams.totalPages);
  const dispatch = useAppDispatch();

  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // If is the end page
  if (currentPage > totalPages - 3) {
    startPage = Math.max(1, totalPages - 4);
    endPage = totalPages;
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i += 1) {
    pages.push(i);
  }

  return (
    <div className="my-16 flex items-center justify-center space-x-1">
      <button
        className="px-5 py-1"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        type="button"
      >
        &lt;
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`rounded-sm border px-3 py-1 ${
            page === currentPage
              ? "bg-yellow-400 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => handlePageChange(page)}
          type="button"
        >
          {page}
        </button>
      ))}

      <button
        className="px-5 py-1"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        type="button"
      >
        &gt;
      </button>
    </div>
  );
};

export { Pagination };
