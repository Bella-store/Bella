import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../Redux/Slices/ProductsSlice";
import ShopSidebar from "../Components/shop/ShopSidebar";
import Card from "../Components/Card";
import SortDropdown from "../Components/shop/SortDropdown";
import Banner from "../Components/shop/Banner";
import Navbar from "../Components/Navbar";
import { db } from "../../config/firebase"; // Ensure you import the correct Firebase configuration

const Shop = () => {
  const dispatch = useDispatch();
  const { items: products } = useSelector((state) => state.products); // Fetch products from Redux
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 200, max: 5000 });
  const [maxPrice, setMaxPrice] = useState(priceRange.max);
  const [sortOption, setSortOption] = useState("Sort by Default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setProducts(fetchedProducts)); // Dispatch products to Redux
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dispatch]);

  // Sync the filtered posts with the products in Redux
  useEffect(() => {
    setFilteredPosts(products); // Initialize filteredPosts with all fetched products
  }, [products]);

  const handlePriceChange = (price) => {
    setMaxPrice(price);
    filterProducts(searchTerm, price, sortOption);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterProducts(term, maxPrice, sortOption);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    filterProducts(searchTerm, maxPrice, option);
  };

  const filterProducts = (searchTerm, maxPrice, sortOption) => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = filtered.filter((product) => product.price <= maxPrice);

    switch (sortOption) {
      case "Sort by Popularity":
        // Add logic
        break;
      case "Sort by Latest":
        // Add logic
        break;
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
    <div className="bg-stone-50 min-h-screen ">
      <Navbar />
      <Banner title={"Shop"} />

      <div className="flex flex-col lg:flex-row px-4 md:px-16 lg:px-18 py-8 ">
        {/* Main Content Area */}
        <div className="flex flex-col flex-grow items-center w-full">
          <div className="flex justify-between items-center mb-4 w-[86%]">
            <p className="text-gray-600 text-sm">
              Showing {filteredPosts.length} of {products.length} results
            </p>
            <SortDropdown onSortChange={handleSortChange} />
          </div>

          <div className="flex flex-wrap justify-center sm:1/2 md:4/5 md:gap-8 w-[100%] animate-fadeIn">
            {filteredPosts.map((product) => (
              <Card
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <ShopSidebar
          priceRange={priceRange}
          onPriceChange={handlePriceChange}
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
};

export default Shop;
