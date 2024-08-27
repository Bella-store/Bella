import { useState, useEffect } from "react";
import Card from "../Components/Card";
import Pagination from "../Components/Pagination";

const Products = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("../db.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched Data:", data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching the products:", error);
        alert("Failed to fetch products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white min-h-screen">
      <div className="mt-16 bg-[#f4f3ef]">
        <div className="bg-product flex justify-center items-center h-72">
          <h2 className="text-5xl md:text-5xl text-gray-700 p-5 font-bold">
            Collection
          </h2>
        </div>
      </div>

      {loading ? (
        <p className="text-center mt-16">Loading...</p>
      ) : posts.length > 0 ? (
        <div className="mt-16 w-full px-4">
          <div className="flex flex-wrap justify-center gap-8">
            {currentPosts.map((product) => (
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
      ) : (
        <p className="text-center mt-16">No products found.</p>
      )}

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
        className="mt-16"
      />
    </div>
  );
};

export default Products;
