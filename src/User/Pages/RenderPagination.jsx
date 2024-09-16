export const renderPagination = (currentPage, totalPages, handlePageChange) => {
    const pages = [];
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    // First page
    pages.push(
        <button
            key={1}
            className={`px-3 py-1 ${
                currentPage === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handlePageChange(1)}
        >
            1
        </button>
    );

    // Dots before current page group
    if (currentPage > 3) {
        pages.push(
            <span key="start-ellipsis" className="px-2">
                ...
            </span>
        );
    }

    // Pages around current page
    for (let i = startPage; i <= endPage; i++) {
        pages.push(
            <button
                key={i}
                className={`px-3 py-1 ${
                    currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => handlePageChange(i)}
            >
                {i}
            </button>
        );
    }

    // Dots after current page group
    if (currentPage < totalPages - 2) {
        pages.push(
            <span key="end-ellipsis" className="px-2">
                ...
            </span>
        );
    }

    // Last page
    if (totalPages > 1) {
        pages.push(
            <button
                key={totalPages}
                className={`px-3 py-1 ${
                    currentPage === totalPages
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                }`}
                onClick={() => handlePageChange(totalPages)}
            >
                {totalPages}
            </button>
        );
    }

    return pages.length > 1 ? (
        <div className="flex space-x-2 justify-center mt-4">
            {/* Previous Button */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 ${
                    currentPage === 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gray-200"
                }`}
            >
                Prev
            </button>
            {pages}
            {/* Next Button */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 ${
                    currentPage === totalPages
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gray-200"
                }`}
            >
                Next
            </button>
        </div>
    ) : null;
};
