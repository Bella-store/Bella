import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import CollectionCard from "../Components/CollectionCard";
import { fetchProducts } from "../../Redux/Slices/ProductsSlice"; // Update this path if necessary
import Footer from "../Components/Footer";
import PageBanner from "../Components/PageBanner";

const Products = () => {
    const PAGE_SIZE = 9; // Number of items per page
    const dispatch = useDispatch();
    const { items: allProducts, loading } = useSelector(
        (state) => state.products
    );

    const [currentPage, setCurrentPage] = useState(1);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        setFilteredProducts(allProducts);
    }, [allProducts]);

    // Get current posts based on currentPage
    const indexOfLastProduct = currentPage * PAGE_SIZE;
    const indexOfFirstProduct = indexOfLastProduct - PAGE_SIZE;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

    const handlePageChange = (page) => {
        if (page === currentPage || page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const renderPagination = () => {
        const pages = [];
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        // Previous Button
        pages.push(
            <button
                key="prev"
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
        );

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
            if (i !== 1 && i !== totalPages) {
                pages.push(
                    <button
                        key={i}
                        className={`px-3 py-1 ${
                            currentPage === i
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                        }`}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </button>
                );
            }
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

        // Next Button
        pages.push(
            <button
                key="next"
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
        );

        return (
            <div className="flex space-x-2 justify-center mt-4">{pages}</div>
        );
    };

    return (
        <div className="bg-stone-50 min-h-screen">
            <Navbar />

            <div className="mt-16 bg-[#f4f3ef] px-[7%]">
                <PageBanner title="Collection" />
            </div>

            {loading ? (
                <div className="text-center mt-16">
                    <div className="flex items-center justify-center w-full mt-[25%]">
                        <div className="">
                            <span className="loading loading-infinity loading-lg text-mainColor"></span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-16 flex flex-col items-center mb-16">
                    {/* Products Container */}
                    <div className="flex flex-wrap justify-center gap-16 sm:w-1/2 md:w-4/5 md:gap-8 w-full">
                        {currentProducts.map((product) => (
                            <CollectionCard
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                imageUrl={product.imageUrl}
                            />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {renderPagination()}
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Products;
