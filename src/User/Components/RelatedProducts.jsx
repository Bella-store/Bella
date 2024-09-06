import { useState, useEffect } from "react";
import Card from "../Components/Card";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useDispatch } from "react-redux";

const RelatedProducts = () => {
    const [relatedProducts, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const fetchedProducts = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Use slice to limit to 4 products
                const limitedProducts = fetchedProducts.slice(0, 4);

                // Dispatch the 4 products to Redux
                dispatch(setProducts(limitedProducts));

                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [dispatch]);

    return (
        <div className="flex flex-col md:flex-col lg:flex-row gap-6 ">
            {relatedProducts.map((product) => (
                <Card
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    link=""
                />
            ))}
        </div>
    );
};

export default RelatedProducts;
