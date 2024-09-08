import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../Redux/Slices/ProductsSlice";
import Details from "../Components/DetailsSection";
import Navbar from "../Components/Navbar";
import Link from "../Components/Links";
import RelatedProducts from "../Components/RelatedProducts";
import Footer from "../Components/Footer";

function ProductDetails() {
  const { id } = useParams(); // Get the product ID from the URL
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.items.find((product) => product.id === id)
  );
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    // Fetch products if not already loaded
    if (!product) {
      dispatch(fetchProducts());
    }
  }, [dispatch, product]);

  if (loading || !product) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <div>
      <Link />
      <Navbar />
      <Details product={product} />
      <div className="px-[7%] py-5 md:py-[3%] md:px-[7%]">
        <h2 className="text-titleColor text-[1.3rem] md:text-[1.6rem] mb-2 md:mb-5 font-semibold">
          Related Products
        </h2>
        <RelatedProducts />
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetails;
