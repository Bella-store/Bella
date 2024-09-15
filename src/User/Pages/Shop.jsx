import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Redux/Slices/ProductsSlice";
import ShopSidebar from "../Components/shop/ShopSidebar";
import Card from "../Components/Card";
import SortDropdown from "../Components/shop/SortDropdown";
import Banner from "../Components/shop/Banner";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Shop = () => {
    const dispatch = useDispatch();
    const { items: products, loading } = useSelector((state) => state.products);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState({ min: 0, max: 100 }); // Initial default
    const [sortOption, setSortOption] = useState("Sort by Default");
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        if (products.length > 0) {
            const prices = products.map((product) => product.price);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            setPriceRange({ min: minPrice, max: maxPrice });
            setFilteredPosts(products);
        }
    }, [products]);

    const handlePriceChange = (min, max) => {
        setPriceRange({ min, max });
        filterProducts(searchTerm, min, max, sortOption, selectedCategories);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        filterProducts(term, priceRange.min, priceRange.max, sortOption, selectedCategories);
    };

    const handleSortChange = (option) => {
        setSortOption(option);
        filterProducts(searchTerm, priceRange.min, priceRange.max, option, selectedCategories);
    };

    const handleCategoryChange = (category) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((item) => item !== category)
            : [...selectedCategories, category];

        setSelectedCategories(updatedCategories);
        filterProducts(searchTerm, priceRange.min, priceRange.max, sortOption, updatedCategories);
    };

    const filterProducts = (searchTerm, minPrice, maxPrice, sortOption, categories) => {
        let filtered = products;

        if (searchTerm) {
            filtered = filtered.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        filtered = filtered.filter((product) => product.price >= minPrice && product.price <= maxPrice);

        if (categories.length > 0) {
            filtered = filtered.filter((product) =>
                categories.includes(product.category)
            );
        }

        switch (sortOption) {
            case "Sort by Price: ↑":
                filtered = filtered.sort((a, b) => a.price - b.price);
                break;
            case "Sort by Price: ↓":
                filtered = filtered.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        setFilteredPosts(filtered);
    };

    return (
        <div className="bg-stone-50 min-h-screen mt-16">
            <Navbar />
            <Banner title={"Shop"} />

            <div className="flex flex-col lg:flex-row px-4 md:px-16 lg:px-18 py-8 ">
                <div className="flex flex-col flex-grow items-center w-full ">
                    <div className="flex justify-between items-center mb-4 w-[86%]">
                        <p className="text-gray-600 text-sm">
                            Showing {filteredPosts.length} of {products.length} results
                        </p>
                        <SortDropdown onSortChange={handleSortChange} />
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center object-centerw-full mt-[25%]">
                            <div className="">
                                <span className="loading loading-infinity loading-lg text-mainColor"></span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-wrap justify-center sm:1/2 md:4/5 md:gap-8 w-[100%] animate-fadeIn">
                            {filteredPosts.map((product) => (
                                <Card
                                    key={product.id}
                                    id={product.id}
                                    title={product.title}
                                    price={product.price}
                                    imageUrl={product.imageUrl}
                                    stockquantity={product.quantity}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <ShopSidebar
                    priceRange={priceRange}
                    onPriceChange={handlePriceChange}
                    onSearch={handleSearch}
                    onCategoryChange={handleCategoryChange}
                />
            </div>
            <Footer />
        </div>
    );
};

export default Shop;
